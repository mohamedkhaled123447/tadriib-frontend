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
import { useRouter } from "next/router";
import { useDistribution } from "@/context/UseDistribution";
import { useCalendar } from "@/context/UseCalendar";
import { TopicsDistributionData } from "@/core/types/types";
function TopicsDistribution() {
  const router = useRouter();
  const { type } = router.query;
  const [curJob, setCurJob] = useState<number>(0);
  const {
    daySubjects,
    nightSubjects,
    dayDistribution,
    nightDistribution,
    months,
    dayTopicsDis,
    nightTopicsDis,
  } = useDistribution();
  const { topics, jobs } = useCalendar();
  const subjects = type === "day" ? daySubjects : nightSubjects;
  const distribution = type === "day" ? dayDistribution : nightDistribution;
  const TopicsDis: TopicsDistributionData =
    type === "day" ? dayTopicsDis[curJob] : nightTopicsDis[curJob];
  if (
    !daySubjects.length ||
    !nightSubjects.length ||
    !nightDistribution ||
    !dayDistribution ||
    !months.length ||
    !dayTopicsDis.length ||
    !nightTopicsDis.length
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
        <Box fontSize="5xl" pb="2">
          {" "}
          المناهج الثابتة لتدريب القوات{" "}
        </Box>
        <Box fontSize="5xl" pb="2">
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
      {TopicsDis.specializedTopicsDistribution.totals.reduce(
        (acc: number, value: number) => acc + value,
        0
      ) && (
        <>
          <Heading textAlign="right" size="md">
             تدريب فني تخصصي:
          </Heading>
          <Flex gap={4} w="95%">
            <Stack>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="xl"
                borderRadius={"xl"}
              >
                الموضوع
              </Box>

              {type === "day"
                ? topics
                    .filter(
                      (topic) => topic.job === jobs[curJob]?.id && topic?.day
                    )
                    .map((topic, index) => (
                      <Box
                        key={index}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="xl"
                        borderRadius={"xl"}
                      >
                        {topic.name}
                      </Box>
                    ))
                : topics
                    .filter(
                      (topic) => topic.job === jobs[curJob]?.id && topic?.night
                    )
                    .map((topic, index) => (
                      <Box
                        key={index}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="xl"
                        borderRadius={"xl"}
                      >
                        {topic.name}
                      </Box>
                    ))}
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="xl"
                borderRadius={"xl"}
              >
                الإجمالى
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
                    w="36"
                    borderRadius={"xl"}
                  >
                    رقم الدرس
                  </Box>
                  <Box
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  >
                    عدد الساعات
                  </Box>
                  {months.map((month, monthId) => (
                    <Box
                      key={monthId}
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.400"
                      w="36"
                      borderRadius={"xl"}
                    >
                      {month.monthName}
                    </Box>
                  ))}
                </Flex>
                {TopicsDis.specializedTopicsDistribution.topicDistribution.map(
                  (row: number[], rowId: number) => (
                    <Flex gap={4} key={rowId}>
                      <Box
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius={"xl"}
                      >
                        {rowId + 1}
                      </Box>
                      <Box
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius={"xl"}
                      >
                        {row.reduce((acc, value) => acc + value, 0)}
                      </Box>
                      {row.map((cell, cellId) => (
                        <Box
                          key={cellId}
                          p="2"
                          textAlign="center"
                          bg="blackAlpha.200"
                          w="36"
                          borderRadius={"xl"}
                        >
                          {cell || "-"}
                        </Box>
                      ))}
                    </Flex>
                  )
                )}
                <Flex gap={4}>
                  <Box
                    p="5"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  ></Box>
                  <Box
                    p="5"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  ></Box>
                  {TopicsDis.specializedTopicsDistribution.totals.map(
                    (cell: number, cellId: number) => (
                      <Box
                        key={cellId}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.400"
                        w="36"
                        borderRadius={"xl"}
                      >
                        {cell || "-"}
                      </Box>
                    )
                  )}
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </>
      )}

      {subjects.map(
        (subject, subjectId) =>
          (subject.type === "general" ||
            jobs[curJob].subjects.includes(subject.id)) && (
            <>
              <Heading textAlign="right" size="md">
               {subject.label}:
              </Heading>
              <Flex gap={4} w="95%">
                <Stack>
                  <Box
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="xl"
                    borderRadius={"xl"}
                  >
                    الموضوع
                  </Box>

                  {type === "day"
                    ? topics
                        .filter(
                          (topic) =>
                            topic?.subject === subject?.id &&
                            topic?.day &&
                            (topic?.job === jobs[curJob]?.id ||
                              topic?.job === null)
                        )
                        .map((topic, index) => (
                          <Box
                            key={index}
                            p="2"
                            textAlign="center"
                            bg="blackAlpha.200"
                            w="xl"
                            borderRadius={"xl"}
                          >
                            {topic.name}
                          </Box>
                        ))
                    : topics
                        .filter(
                          (topic) =>
                            topic?.subject === subject?.id &&
                            topic?.night &&
                            (topic?.job === jobs[curJob]?.id ||
                              topic?.job === null)
                        )
                        .map((topic, index) => (
                          <Box
                            key={index}
                            p="2"
                            textAlign="center"
                            bg="blackAlpha.200"
                            w="xl"
                            borderRadius={"xl"}
                          >
                            {topic.name}
                          </Box>
                        ))}
                  <Box
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="xl"
                    borderRadius={"xl"}
                  >
                    الإجمالى
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
                        w="36"
                        borderRadius={"xl"}
                      >
                        رقم الدرس
                      </Box>
                      <Box
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.400"
                        w="36"
                        borderRadius={"xl"}
                      >
                        عدد الساعات
                      </Box>
                      {months.map((month, monthId) => (
                        <Box
                          key={monthId}
                          p="2"
                          textAlign="center"
                          bg="blackAlpha.400"
                          w="36"
                          borderRadius={"xl"}
                        >
                          {month.monthName}
                        </Box>
                      ))}
                    </Flex>
                    {TopicsDis.GeneralTopicsDistribution[subjectId].mat.map(
                      (row: number[], rowId: number) => (
                        <Flex gap={4} key={rowId}>
                          <Box
                            p="2"
                            textAlign="center"
                            bg="blackAlpha.200"
                            w="36"
                            borderRadius={"xl"}
                          >
                            {rowId + 1}
                          </Box>
                          <Box
                            p="2"
                            textAlign="center"
                            bg="blackAlpha.200"
                            w="36"
                            borderRadius={"xl"}
                          >
                            {row.reduce((acc, value) => acc + value, 0)}
                          </Box>
                          {row.map((cell, cellId) => (
                            <Box
                              key={cellId}
                              p="2"
                              textAlign="center"
                              bg="blackAlpha.200"
                              w="36"
                              borderRadius={"xl"}
                            >
                              {cell || "-"}
                            </Box>
                          ))}
                        </Flex>
                      )
                    )}
                    <Flex gap={4}>
                      <Box
                        p="5"
                        textAlign="center"
                        bg="blackAlpha.400"
                        w="36"
                        borderRadius={"xl"}
                      ></Box>
                      <Box
                        p="5"
                        textAlign="center"
                        bg="blackAlpha.400"
                        w="36"
                        borderRadius={"xl"}
                      ></Box>
                      {distribution.mat[subjectId].map((cell, cellId) => (
                        <Box
                          key={cellId}
                          p="2"
                          textAlign="center"
                          bg="blackAlpha.400"
                          w="36"
                          borderRadius={"xl"}
                        >
                          {cell || "-"}
                        </Box>
                      ))}
                    </Flex>
                  </Stack>
                </Flex>
              </Flex>
            </>
          )
      )}
    </Stack>
  );
}

export default TopicsDistribution;
