import React, { useState, memo, useEffect, useMemo } from "react";
import {
    Box,
    Text,
    Flex,
    Stack,
    Center,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { DayType, MonthData, WeekData, interval } from "@/core/types/types";
const weekName = ['الاول', "الثاني", "الثالث", "الرابع", "الخامس", "السادس"]
import { generateTotals } from "@/core/utils/calender";
const CalendarMonth = ({
    month,
    types,
    weekStart,
    updateDayType,
    updateMonthsData,
    updateDayTypeCol
}: {
    month: MonthData;
    types: DayType[]
    weekStart: number
    updateDayType: Function
    updateMonthsData: Function
    updateDayTypeCol: Function
}) => {
    const [interval, setInterval] = useState<interval>({
        startDate: '',
        endDate: ''
    });
    const totals = generateTotals(month)
    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInterval((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        setInterval({
            startDate: month.startDate,
            endDate: month.endDate
        })
    }, [month.startDate, month.endDate])
    return (
        <Box mb={8}>
            <Popover>
                <PopoverTrigger>
                    <Text textAlign="center" fontSize="2xl" mb={4} cursor="pointer">
                        {month.monthName}
                    </Text>
                </PopoverTrigger>
                <PopoverContent p={4} borderRadius="lg" boxShadow="md">
                    <Stack spacing={2}>

                        <FormControl id="item-name" isRequired mb={4}>
                            <FormLabel>بداية الشهر</FormLabel>
                            <Input
                                placeholder="yyyy-mm-dd"
                                value={interval.startDate}
                                type="date"
                                name="startDate"
                                onChange={handleIntervalChange}
                            />
                        </FormControl>
                        <FormControl id="item-name" isRequired mb={4}>
                            <FormLabel>نهاية الشهر</FormLabel>
                            <Input
                                placeholder="yyyy-mm-dd"
                                value={interval.endDate}
                                type="date"
                                name="endDate"
                                onChange={handleIntervalChange}
                            />
                        </FormControl>
                        <Button onClick={() => updateMonthsData(interval, month.month)}>
                            إعادة ضبط
                        </Button>

                    </Stack>
                </PopoverContent>
            </Popover>

            <Flex justifyContent="center" gap={"2"}>
                <Flex gap={2} p="2">
                    {month.weeks.map((week, weekIndex) => (
                        <Stack key={weekIndex}>
                            <Menu>
                                <MenuButton w="full" h="full">
                                    <Center>{weekIndex + weekStart - month.weeks.length}</Center>
                                </MenuButton>
                                <MenuList>
                                    {types.map((type: DayType) => (
                                        <MenuItem
                                            key={type.id}
                                            onClick={() => updateDayTypeCol(type.name, month.month, weekIndex)}
                                        >
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            {week.days.map((day, dayIndex) => (
                                <Center
                                    key={`${weekIndex}-${dayIndex}`}
                                    textAlign="center"
                                    p={2}
                                    w="20"
                                    h="10"
                                    borderRadius="xl"
                                    bg={day.type.color}
                                >
                                    {day ? (
                                        <Menu>
                                            <MenuButton w="full" h="full">
                                                <Text fontWeight="bold">
                                                    {new Date(day.date)?.getDate() || '-'}
                                                </Text>
                                            </MenuButton>
                                            <MenuList>
                                                {types.map((type: DayType) => (
                                                    <MenuItem
                                                        key={type.id}
                                                        onClick={() =>
                                                            updateDayType(
                                                                dayIndex, weekIndex, month.month, type.id
                                                            )
                                                        }
                                                    >
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    ) : (
                                        <Text></Text>
                                    )}
                                </Center>
                            ))}
                            <Box
                                key={8}
                                w="20"
                                h="10"
                                p="5"
                               
                            >
                                
                            </Box>
                            <Center
                                key={9}
                                textAlign="center"
                                p={2}
                                w="20"
                                h="10"
                                borderRadius="xl"
                                bg='blackAlpha.200'
                            >
                                {totals.totalTrainingHours[weekIndex]}
                            </Center>
                            <Center
                                key={10}
                                textAlign="center"
                                p={2}
                                w="20"
                                h="10"
                                borderRadius="xl"
                                bg='blackAlpha.200'
                            >
                                {totals.totalDayLearningHours[weekIndex]}
                            </Center>
                            <Center
                                key={11}
                                textAlign="center"
                                p={2}
                                w="20"
                                h="10"
                                borderRadius="xl"
                                bg='blackAlpha.200'
                            >
                                {totals.totalNightLearningHours[weekIndex]}
                            </Center>
                            <Center
                                key={12}
                                textAlign="center"
                                p={2}
                                w="20"
                                h="10"
                                borderRadius="xl"
                                bg='blackAlpha.200'
                            >
                                {totals.totalBoundEducationHours[weekIndex]}
                            </Center>
                            <Center
                                key={13}
                                textAlign="center"
                                p={2}
                                w="20"
                                h="10"
                                borderRadius="xl"
                                bg='blackAlpha.200'
                            >
                                {totals.totalBoundEducationHours[weekIndex]
                                    + totals.totalDayLearningHours[weekIndex]
                                    + totals.totalNightLearningHours[weekIndex]
                                    + totals.totalTrainingHours[weekIndex]}
                            </Center>
                        </Stack>
                    ))}
                </Flex>

            </Flex>
        </Box>
    );
};

export default memo(CalendarMonth);
