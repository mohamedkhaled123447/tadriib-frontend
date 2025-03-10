import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Text,
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Center,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import CalendarMonth from "@/components/CalendarMonth";
import { DayType, interval } from "@/core/types/types";
import { Totals } from "@/core/utils/calender";
import { useCalendar } from "@/context/UseCalendar";
import DayClass from "@/pages/DayClass";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import ConfirmationDialog from "@/core/modals/ConfirmationDialog";
const Calendar = () => {
  const toast = useToast();
  const {
    months,
    monthsData,
    setMonths,
    setMonthsData,
    updateDayType,
    updateMonthsData,
    updateDayTypeRow,
    updateDayTypeCol,
    generateInterval,
    types,
    setTypes,
    setCalenderId,
    setSelectedTopics,
  } = useCalendar();

  const router = useRouter();
  const { id } = router.query;
  const [intervalName, setIntervalName] = useState<string>();
  const [section, setSection] = useState<number>(1);
  const [interval, setInterval] = useState<interval>({
    startDate: "2025-02-02",
    endDate: "2025-08-06",
  });
  const [weekStart, setWeekStart] = useState<number>(1);
  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInterval((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const renderMonths = useMemo(() => {
    let start = weekStart;
    const renderedMonths = months.map((month, index) => {
      start += month.weeks.length;
      return (
        <CalendarMonth
          key={index}
          month={month}
          weekStart={start}
          types={types}
          updateDayType={updateDayType}
          updateMonthsData={updateMonthsData}
          updateDayTypeCol={updateDayTypeCol}
        />
      );
    });
    return renderedMonths;
  }, [months, types, updateDayType, updateMonthsData, updateDayTypeCol]);
  const totals = useMemo(() => Totals(months), [months]);
  const handleSubmit = async () => {
    const url = `${BASE_SERVER_URL}/api/interval/${id}/`;
    const method = "PATCH";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: months,
        monthsData: monthsData,
        weekStart: weekStart,
        types: types,
      }),
    });
    if (res.ok) {
      toast({
        title: "success",
        description: "تم حفظ الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      const errors = await res.json();
      console.log(errors);
    }
  };
  const fetchData = async () => {
    const url = `${BASE_SERVER_URL}/api/interval/${id}/`;
    const res = await fetch(url);
    if (res.ok) {
      localStorage.clear();
      const data = await res.json();
      setMonths(data.data);
      setMonthsData(data.monthsData);
      setWeekStart(data.weekStart);
      setTypes(data.types);
      setIntervalName(data.name);
      setCalenderId(data.id);
      setSelectedTopics(data.topics);
    } else {
      const errors = await res.json();
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  if (!months.length || !monthsData.length || !types.length)
    return (
      <Center w="100%" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  return (
    <>
      {section === 1 && <DayClass />}
      {section === 2 && (
        <Flex w="full" flexDir={"column"} justify={"center"} align={"center"}>
          <Flex gap={"2"}>
            <Popover>
              <PopoverTrigger>
                <Heading as="address" size="xl" py="2" cursor="pointer">
                  {" "}
                  {intervalName}
                </Heading>
              </PopoverTrigger>
              <PopoverContent p={4} borderRadius="lg" boxShadow="md">
                <Stack spacing={2}>
                  <FormControl id="item-name" isRequired mb={4}>
                    <FormLabel>بداية الفترة</FormLabel>
                    <Input
                      placeholder="yyyy-mm-dd"
                      value={interval.startDate}
                      type="date"
                      name="startDate"
                      onChange={handleIntervalChange}
                    />
                  </FormControl>
                  <FormControl id="item-name" isRequired mb={4}>
                    <FormLabel>نهاية الفترة</FormLabel>
                    <Input
                      placeholder="yyyy-mm-dd"
                      value={interval.endDate}
                      type="date"
                      name="endDate"
                      onChange={handleIntervalChange}
                    />
                  </FormControl>
                  <FormControl id="item-name" isRequired mb={4}>
                    <FormLabel> رقم اول اسبوع في الفترة</FormLabel>
                    <Input
                      value={weekStart}
                      type="number"
                      onChange={(e) => setWeekStart(Number(e.target.value))}
                    />
                  </FormControl>
                  <Button onClick={() => generateInterval(interval)}>
                    إعادة ضبط
                  </Button>
                </Stack>
              </PopoverContent>
            </Popover>
          </Flex>
          <Flex gap="2" w="full" alignItems={"center"}>
            <Stack p="2" mt={10}>
              {[
                "السبت",
                "الأحد",
                "الإثنين",
                "الثلاثاء",
                "الأربعاء",
                "الخميس",
                "الجمعة",
              ].map((day, index) => (
                <Menu key={index}>
                  <MenuButton w="full" h="full">
                    <Box
                      key={index}
                      textAlign="center"
                      fontWeight="bold"
                      bg="blackAlpha.100"
                      w="40"
                      h="10"
                      p="2"
                      borderRadius="xl"
                    >
                      {day}
                    </Box>
                  </MenuButton>
                  <MenuList>
                    {types.map((type: DayType) => (
                      <MenuItem
                        key={type.id}
                        onClick={() => updateDayTypeRow(type.name, index)}
                      >
                        {type.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ))}
              <Box w="40" h="10" p="2" color="white">
                temp
              </Box>
              {[
                "اللياقة البدنية",
                "النهاري",
                "الليلي",
                "التعليم المنضم",
                "الاجمالي",
              ].map((day, index) => (
                <Box
                  key={index + 8}
                  textAlign="center"
                  fontWeight="bold"
                  bg="blackAlpha.100"
                  w="40"
                  h="10"
                  p="2"
                  borderRadius="xl"
                >
                  {day}
                </Box>
              ))}
            </Stack>
            <Flex
              gap={"4"}
              overflowX={"scroll"}
              w="90%"
              sx={{
                "::-webkit-scrollbar": {
                  cursor: "pointer",
                  width: "10px",
                  height: "10px",
                  padding: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                  cursor: "pointer",
                  width: "10px",
                  height: "10px",
                  bg: "blackAlpha.300",
                  margin: "10px",
                  borderRadius: "xl",
                },
              }}
            >
              {renderMonths}
              <Stack>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="468"
                  borderRadius="xl"
                ></Box>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="10"
                  borderRadius="xl"
                  bg="blackAlpha.200"
                >
                  {totals.totalTrainingHours}
                </Box>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="10"
                  borderRadius="xl"
                  bg="blackAlpha.200"
                >
                  {totals.totalDayLearningHours}
                </Box>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="10"
                  borderRadius="xl"
                  bg="blackAlpha.200"
                >
                  {totals.totalNightLearningHours}
                </Box>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="10"
                  borderRadius="xl"
                  bg="blackAlpha.200"
                >
                  {totals.totalBoundEducationHours}
                </Box>
                <Box
                  textAlign="center"
                  p={2}
                  w="20"
                  h="10"
                  borderRadius="xl"
                  bg="blackAlpha.200"
                >
                  {totals.totalBoundEducationHours +
                    totals.totalDayLearningHours +
                    totals.totalNightLearningHours +
                    totals.totalTrainingHours}
                </Box>
              </Stack>
            </Flex>
          </Flex>

          <Flex
            gap={"8"}
            mt="8"
            p="4"
            justifyContent={"center"}
            flexWrap="wrap"
          >
            {types.map((item, index) => (
              <Flex
                key={index}
                gap="2"
                alignItems={"center"}
                p="4"
                bg="blackAlpha.100"
                borderRadius={"3xl"}
                justify={"center"}
              >
                <Box w="20" h="10" bg={item.color} borderRadius={"xl"} />{" "}
                <Text fontWeight={"bold"}>{item.name} </Text>
              </Flex>
            ))}
          </Flex>
          <Flex>
            <ConfirmationDialog handleSubmit={handleSubmit} />
            <Button
              my={1}
              mx={2}
              borderRadius={"full"}
              colorScheme="blue"
              w="fit-content"
              onClick={handleSubmit}
            >
              حفظ
            </Button>
          </Flex>
        </Flex>
      )}
      {section === 1 && (
        <Center>
          <Button
            mb={10}
            borderRadius="full"
            colorScheme="blue"
            size="lg"
            fontWeight="bold"
            onClick={() => setSection(2)}
            justifyContent="center"
          >
            التالي
          </Button>
        </Center>
      )}
    </>
  );
};

export default Calendar;
