import React, { useMemo, useState } from "react";
import { useDistribution } from "@/context/UseDistribution";
import { useCalendar } from "@/context/UseCalendar";
import { the546, the548 } from "@/core/utils/helper";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Center,
  Badge,
  Spinner,
} from "@chakra-ui/react";

const numberToArabic: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
  7: "السابع",
};
function The548() {
  const router = useRouter();
  const { month, type, job } = router.query;
  const { topics, months, jobs } = useCalendar();
  const {
    daySubjects,
    dayTopicsDis,
    dayDistribution,
    nightSubjects,
    nightTopicsDis,
    nightDistribution,
  } = useDistribution();

  const the548DistributionDay = useMemo(() => {
    return the548(
      daySubjects,
      dayDistribution.months[Number(month)],
      topics,
      jobs[Number(job)]
    );
  }, [daySubjects, dayDistribution, topics]);
  const the548DistributionNight = useMemo(() => {
    return the548(
      nightSubjects,
      nightDistribution.months[Number(month)],
      topics,
      jobs[Number(job)]
    );
  }, [nightSubjects, nightDistribution, topics]);
  const the548Distribution =
    type === "day" ? the548DistributionDay : the548DistributionNight;
  if (!topics.length || !months.length || !jobs.length) {
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
          548 عن شهر {months[Number(month)]?.monthName}
        </Box>
        <Box fontSize="3xl" pb="2">
          ({jobs[Number(job)].name})
        </Box>
        <Box fontSize="3xl" pb="2">
          {" "}
          {type === "day" ? "(نهاري)" : "(ليلي)"}
        </Box>
      </Flex>
      <Flex gap={4} w="95%">
        <Stack>
          <Flex gap={2}>
            <Center
              p="5"
              textAlign="center"
              bg="blackAlpha.400"
              w="60"
              borderRadius={"xl"}
              h="full"
            >
              الموضوع
            </Center>

            <Center
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="16"
              borderRadius={"xl"}
              h="full"
            >
              ساعات الشهر
            </Center>
            {months[Number(month)].weeks.map((week, weekId) => (
              <Stack key={weekId}>
                <Flex>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="full"
                    borderRadius={"xl"}
                    h="full"
                  >
                    الاسبوع {numberToArabic[weekId + 1]}
                  </Center>
                </Flex>
                <Flex gap={2}>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="16"
                    borderRadius={"xl"}
                    h="full"
                  >
                    ساعات
                  </Center>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="16"
                    borderRadius={"xl"}
                    h="full"
                  >
                    ساعات
                  </Center>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="md"
                    borderRadius={"xl"}
                    h="full"
                  >
                    دروس
                  </Center>
                </Flex>
              </Stack>
            ))}
          </Flex>
          {the548Distribution.map((item, index) => (
            <Flex key={index} gap={2}>
              <Stack>
                <Center
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                  h="full"
                >
                  {item.subject}
                </Center>
              </Stack>
              <Stack>
                <Center
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="16"
                  borderRadius={"xl"}
                  h="full"
                >
                  {item.total || "-"}
                </Center>
              </Stack>
              {months[Number(month)].weeks.map((week, weekId) => (
                <Flex gap={2} w="100%" key={weekId}>
                  <Stack>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="16"
                      borderRadius={"xl"}
                      h="full"
                    >
                      {item.weeks[weekId].weekTotal || "-"}
                    </Center>
                  </Stack>
                  <Stack w="full">
                    {Array.from<string>(
                      item?.weeks[weekId]?.frequencyMap?.keys() || []
                    ).map((key, index) => (
                      <Flex key={index} h="full" gap={2}>
                        <Center
                          p="2"
                          textAlign="center"
                          bg="blackAlpha.200"
                          w="16"
                          borderRadius={"xl"}
                          h="full"
                        >
                          {item?.weeks[weekId]?.frequencyMap?.get(key)}
                        </Center>
                        <Center
                          p="2"
                          textAlign="center"
                          bg="blackAlpha.200"
                          w="md"
                          borderRadius={"xl"}
                          h="full"
                        >
                          {key}
                        </Center>
                      </Flex>
                    ))}
                    {!item.weeks[weekId].weekTotal && (
                      <Flex gap={2} h="full">
                        <Center
                          p="2"
                          w="16"
                          textAlign="center"
                          bg="blackAlpha.200"
                          borderRadius={"xl"}
                          h="full"
                        >
                          -
                        </Center>

                        <Center
                          p="2"
                          w="md"
                          textAlign="center"
                          bg="blackAlpha.200"
                          borderRadius={"xl"}
                          h="full"
                        >
                          -
                        </Center>
                      </Flex>
                    )}
                  </Stack>
                </Flex>
              ))}
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default The548;
