import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDistribution } from "@/context/UseDistribution";
const numberToArabic: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
  7: "السابع",
};
const HoursLink = () => {
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
          توزيع الساعات علي الموضوعات عن شهر {
            months[Number(id)]?.monthName
          }{" "}
        </Box>
        <Box fontSize="3xl" pb="2">
          {" "}
          {type === "day" ? "(نهاري)" : "(ليلي)"}
        </Box>
      </Flex>
      <Flex gap={4} w="95%">
        <Stack>
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            المادة
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
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
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                الاسبوع
              </Box>
              {months[Number(id)]?.weeks.map((week, index) => (
                <Box
                  key={index}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                >
                  {numberToArabic[index + 1]}
                </Box>
              ))}
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                المتبقي
              </Box>
            </Flex>
            {type === "day" && (
              <Flex gap={4}>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {months[Number(id)]?.weeks.reduce(
                    (acc, week) => acc + week.totalTrainingHours,
                    0
                  )}
                </Box>
                {months[Number(id)]?.weeks.map((week, index) => (
                  <Box
                    key={index}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {week.totalTrainingHours}
                  </Box>
                ))}
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  0
                </Box>
              </Flex>
            )}
            <Flex gap={4}>
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
              {months[Number(id)]?.weeks.map((week, index) => (
                <Box
                  key={index}
                  p="5"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                ></Box>
              ))}
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
            </Flex>
            {specificSubjects.map((subject, index) => (
              <Flex gap={4} key={index}>
                <Box
                  key={index}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.months[Number(id)]?.mat[index].reduce(
                    (acc, value) => acc + value,
                    0
                  )}
                </Box>
                {distribution.months[Number(id)]?.mat[index].map(
                  (weekHours: any, rowId: any) => (
                    <Box
                      key={`${index}-${rowId}`}
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="60"
                      borderRadius={"xl"}
                    >
                      {weekHours}
                    </Box>
                  )
                )}
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.months[Number(id)]?.rows[index]}
                </Box>
              </Flex>
            ))}
            <Flex gap={4}>
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
              {months[Number(id)]?.weeks.map((week, index) => (
                <Box
                  key={index}
                  p="5"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                ></Box>
              ))}
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
            </Flex>
            {type === "day" && (
              <Flex gap={4}>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {months[Number(id)]?.weeks.reduce(
                    (acc, week) => acc + week.totalBoundEducationHours,
                    0
                  )}
                </Box>
                {months[Number(id)]?.weeks.map((week, index) => (
                  <Box
                    key={index}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {week.totalBoundEducationHours}
                  </Box>
                ))}
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  0
                </Box>
              </Flex>
            )}
            {generalSubjects.map((subject, index) => (
              <Flex gap={4} key={index}>
                <Box
                  key={index + specificSubjects.length}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.months[Number(id)]?.mat[
                    index + specificSubjects.length
                  ].reduce((acc, value) => acc + value, 0)}
                </Box>
                {distribution.months[Number(id)]?.mat[
                  index + specificSubjects.length
                ].map((weekHours: any, rowId: any) => (
                  <Box
                    key={`${index + specificSubjects.length}-${rowId}`}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {weekHours}
                  </Box>
                ))}
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {
                    distribution.months[Number(id)]?.rows[
                      index + specificSubjects.length
                    ]
                  }
                </Box>
              </Flex>
            ))}
            <Flex gap={4}>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                {type === "day"
                  ? months[Number(id)]?.weeks.reduce(
                      (acc, week) =>
                        acc +
                        week.totalDayLearningHours +
                        week.totalBoundEducationHours +
                        week.totalTrainingHours,
                      0
                    )
                  : months[Number(id)]?.weeks.reduce(
                      (acc, week) => acc + week.totalNightLearningHours,
                      0
                    )}
              </Box>
              {months[Number(id)]?.weeks.map((week, index) => (
                <Box
                  key={index}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                >
                  {type === "day"
                    ? week.totalBoundEducationHours +
                      week.totalDayLearningHours +
                      week.totalTrainingHours
                    : week.totalNightLearningHours}
                </Box>
              ))}
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                -
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Flex gap={5}>
        <Button
          borderRadius="full"
          colorScheme="blue"
          onClick={() =>
            type === "day"
              ? router.push(`/547/weeks/day/${id}`)
              : router.push(`/547/weeks/night/${id}`)
          }
        >
          545
        </Button>
        <Button
          borderRadius="full"
          colorScheme="blue"
          onClick={() =>
            type === "day"
              ? router.push(`/547Jobs/weeks/day/${id}`)
              : router.push(`/547Jobs/weeks/night/${id}`)
          }
        >
          547 تخصصات
        </Button>
      </Flex>
    </Stack>
  );
};

export default HoursLink;
