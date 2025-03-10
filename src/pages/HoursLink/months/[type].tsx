import { Box, Flex, Input, Stack, Button, Heading,Center,Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDistribution } from "@/context/UseDistribution";
const HoursLink = () => {
  const router = useRouter();
  const { type } = router.query;
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
  const subjects = type === "day" ? daySubjects : nightSubjects;
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
          توزيع الساعات علي الموضوعات عن فترة{" "}
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
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="60"
            borderRadius={"xl"}
          >
            متبقى
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
                النسبة
              </Box>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                ساعات
              </Box>
              {months.map((month, monthId) => (
                <Box
                  key={monthId}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                  cursor={"pointer"}
                  onClick={() =>
                    router.push(`/HoursLink/weeks/${type}/${monthId}`)
                  }
                >
                  {month.monthName}
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
                  -
                </Box>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {months.reduce(
                    (acc, month) => acc + month.totalTrainingHours,
                    0
                  )}
                </Box>
                {months.map((month, monthId) => (
                  <Box
                    key={monthId}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {month.totalTrainingHours}
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
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
              {months.map((month, monthId) => (
                <Box
                  key={monthId}
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
                  {subject.precentage}%
                </Box>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.mat[index].reduce(
                    (acc, value) => acc + value,
                    0
                  )}
                </Box>
                {distribution.mat[index].map((monthHours: any, rowId: any) => (
                  <Box
                    key={`${index}-${rowId}`}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {monthHours}
                  </Box>
                ))}
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.rows[index]}
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
              <Box
                p="5"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              ></Box>
              {months.map((month, monthId) => (
                <Box
                  key={monthId}
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
                  -
                </Box>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {months.reduce(
                    (acc, month) => acc + month.totalBoundEducationHours,
                    0
                  )}
                </Box>
                {months.map((month, monthId) => (
                  <Box
                    key={monthId}
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.200"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {month.totalBoundEducationHours}
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
                  {subject.precentage}%
                </Box>
                <Box
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="60"
                  borderRadius={"xl"}
                >
                  {distribution.mat[index + specificSubjects.length].reduce(
                    (acc, value) => acc + value,
                    0
                  )}
                </Box>
                {distribution.mat[index + specificSubjects.length].map(
                  (monthHours: any, rowId: any) => (
                    <Box
                      key={`${index + specificSubjects.length}-${rowId}`}
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="60"
                      borderRadius={"xl"}
                    >
                      {monthHours}
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
                  {distribution.rows[index + specificSubjects.length]}
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
                {subjects.reduce(
                  (acc, subject) => acc + subject.precentage,
                  0
                ) + 3}
                %
              </Box>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                {type === "day"
                  ? months.reduce(
                      (acc, month) =>
                        acc +
                        month.totalDayLearningHours +
                        month.totalBoundEducationHours +
                        month.totalTrainingHours,
                      0
                    )
                  : months.reduce(
                      (acc, month) => acc + month.totalNightLearningHours,
                      0
                    )}
              </Box>
              {months.map((month, index) => (
                <Box
                  key={index}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                >
                  {type === "day"
                    ? month.totalBoundEducationHours +
                      month.totalDayLearningHours +
                      month.totalTrainingHours
                    : month.totalNightLearningHours}
                </Box>
              ))}
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                0
              </Box>
            </Flex>
            <Flex gap={4}>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                {100 -
                  (subjects.reduce(
                    (acc, subject) => acc + subject.precentage,
                    0
                  ) +
                    3)}
                %
              </Box>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
              >
                {distribution.cols.reduce((a: any, s: any) => {
                  a += s;
                  return a;
                }, 0)}
              </Box>
              {distribution.cols.map((value: number, index: number) => (
                <Box
                  key={index}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="60"
                  borderRadius={"xl"}
                >
                  {value}
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
      <Button
        borderRadius="full"
        colorScheme="blue"
        onClick={() =>
          type === "day"
            ? router.push("/547/months/day")
            : router.push("/547/months/night")
        }
      >
        547
      </Button>
      <Button
        borderRadius="full"
        colorScheme="blue"
        onClick={() =>
          type === "day"
            ? router.push("/topicsDistribution/day")
            : router.push("/topicsDistribution/night")
        }
      >
        مناهج التدريب الثابتة
      </Button>
    </Stack>
  );
};

export default HoursLink;
