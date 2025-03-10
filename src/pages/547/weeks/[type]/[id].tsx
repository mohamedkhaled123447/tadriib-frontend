import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Center,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDistribution } from "@/context/UseDistribution";
import { useRouter } from "next/router";
import Week from "@/components/547/Week";
import { useCalendar } from "@/context/UseCalendar";
const TheWeek547 = () => {
  const { jobs } = useCalendar();
  const [curJob, setCurJob] = useState<number>(0);
  const router = useRouter();
  const { type, id } = router.query;
  const {
    daySubjects,
    nightSubjects,
    dayDistribution,
    nightDistribution,
    months,
  } = useDistribution();
  const specificSubjects =
    type === "day"
      ? daySubjects.filter((subject) => subject.type === "specific")
      : nightSubjects.filter((subject) => subject.type === "specific");
  const generalSubjects =
    type === "day"
      ? daySubjects.filter((subject) => subject.type === "general")
      : nightSubjects.filter((subject) => subject.type === "general");
  const distribution = type === "day" ? dayDistribution : nightDistribution;
  if (
    !daySubjects.length ||
    !nightSubjects.length ||
    !nightDistribution ||
    !dayDistribution ||
    !months.length
  ) {
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
  }
  return (
    <Stack spacing={"2"} align={"center"} justify={"center"} my="10">
      <Flex gap={"2"}>
        <Box fontSize="3xl" pb="2">
          {" "}
          547 عن شهر {months[Number(id)]?.monthName}{" "}
        </Box>
        <Box fontSize="3xl" pb="2">
          {" "}
          {type === "day" ? "(نهاري)" : "(ليلي)"}
        </Box>
      </Flex>
      <Flex gap={2} wrap="wrap" justify="center">
        {jobs.map((job, index) => (
          <Badge
            cursor="pointer"
            key={index}
            borderRadius="full"
            colorScheme={curJob === index ? "green" : "gray"}
            p={3}
            onClick={() => setCurJob(index)}
          >
            {job.name}
          </Badge>
        ))}
      </Flex>
      <Flex gap={4} w="95%">
        <Stack>
          <Box
            py="8"
            textAlign="center"
            bg="blackAlpha.200"
            w="60"
            borderRadius={"xl"}
          >
            الموضوعات
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="60"
              borderRadius={"xl"}
            >
              اللياقة
            </Box>
          )}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            أولا :الموضوعات الرئيسية:{" "}
          </Box>
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            تد فني تخصصي{" "}
          </Box>
          {specificSubjects.map((es: any, index) => (
            <Box
              key={index}
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
              w="60"
              borderRadius={"xl"}
            >
              {es.label}
            </Box>
          ))}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            ثانيا :الموضوعات العامة:{" "}
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
              w="60"
              borderRadius={"xl"}
            >
              التعليم المنضم
            </Box>
          )}
          {generalSubjects.map((es: any, index) => (
            <Box
              key={specificSubjects.length + index}
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
              w="60"
              borderRadius={"xl"}
            >
              {es.label}
            </Box>
          ))}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            الاجمالي
          </Box>
        </Stack>
        <Flex
          gap={4}
          overflowX={"scroll"}
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
          <Stack mb={5}>
            <Flex gap={4}>
              {months[Number(id)]?.weeks.map((week, weekId) => (
                <Week
                  monthId={Number(id)}
                  weekId={weekId}
                  key={weekId}
                  week={week}
                  jobIndex={curJob}
                  weekData={distribution.months[Number(id)]?.weeks[weekId]}
                  type={type as string}
                  doc="547"
                  monthName={months[Number(id)]?.monthName}
                  specificSubjects={specificSubjects}
                  generalSubjects={generalSubjects}
                  limit={specificSubjects.length}
                />
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Flex gap={4}>
        <Button
          borderRadius="full"
          colorScheme="blue"
          onClick={() =>
            type === "day"
              ? router.push(`/545/weeks/day/${id}`)
              : router.push(`/545/weeks/night/${id}`)
          }
        >
          545
        </Button>
        <Button
          onClick={() => {
            type === "day"
              ? router.push(`/546/${id}/day`)
              : router.push(`/546/${id}/night`);
          }}
          colorScheme="blue"
          borderRadius="full"
        >
          546
        </Button>
      </Flex>
    </Stack>
  );
};

export default TheWeek547;
