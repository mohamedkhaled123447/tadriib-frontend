import React from "react";
import {
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Divider,
  Center,
  Box,
} from "@chakra-ui/react";
import { WeekData, disWeek } from "@/core/types/types";
import { Subject, Topic } from "@/core/interfaces";
import { useCalendar } from "@/context/UseCalendar";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useRouter } from "next/router";
const numberToArabic: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
  7: "السابع",
};
const ToArabic: Record<number, string> = {
  1: "الأولي",
  2: "الثانية",
  3: "الثالثة",
  4: "الرابعة",
  5: "الخامسة",
  6: "السادسة",
  7: "السابعة",
};
const numberToDay: Record<number, string> = {
  1: "السبت",
  2: "الاحد",
  3: "الاثنين",
  4: "الثلاثاء",
  5: "الاربعاء",
  6: "الخميس",
  7: "الجمعة",
};
function Week546({
  week,
  type,
  weekId,
  topics,
  daySubjects,
  nightSubjects,
}: {
  weekId: number;
  week: disWeek;
  type: string;
  topics: Topic[];
  daySubjects: Subject[];
  nightSubjects: Subject[];
}) {
  const Subjects = type === "day" ? daySubjects : nightSubjects;
  return (
    <Stack spacing={"2"} align={"center"} >
      <Stack textAlign="center" w="100%">
        <Center
          p="2"
          textAlign="center"
          bg="blackAlpha.200"
          borderRadius={"xl"}
        >
          الاسبوع {numberToArabic[weekId]}
        </Center>
      </Stack>
      <Stack spacing={5}>
        <Flex gap={2}>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="36"
            borderRadius={"xl"}
          >
            التاريخ
          </Center>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="36"
            borderRadius={"xl"}
          >
            الفصائل
          </Center>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="md"
            borderRadius={"xl"}
          >
            الموضوعات والدروس ومشتملاتها
          </Center>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="36"
            borderRadius={"xl"}
          >
            المكان
          </Center>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="36"
            borderRadius={"xl"}
          >
            مساعدات التدريب
          </Center>
          <Center
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="36"
            borderRadius={"xl"}
          >
            المعلم المشرف
          </Center>
        </Flex>
        {week.cols.map((day, dayId) =>
          type === "night" &&
          (dayId === 0 ||
            dayId === 2 ||
            dayId === 3 ||
            dayId === 5 ||
            dayId === 6) ? (
            <></>
          ) : (
            <Flex key={dayId} gap={2}>
              <Stack>
                <Center
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.400"
                  w="36"
                  h="full"
                  borderRadius="xl"
                >
                  {numberToDay[dayId + 1]}
                </Center>
              </Stack>
              <Stack>
                {type === "day" && (
                  <Flex gap={2}>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius="xl"
                    >
                      الطابور الاول
                    </Center>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="md"
                      borderRadius="xl"
                    >
                      {dayId === 5
                        ? "تعليم منضم"
                        : dayId === 6
                        ? "راحة اسبوعية"
                        : "تربية بدنية"}
                    </Center>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius="xl"
                    >
                      {dayId === 6 ? "ــ" : "ارض تعليم الفوج"}
                    </Center>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius="xl"
                    >
                      -
                    </Center>
                    <Center
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius="xl"
                    >
                      -
                    </Center>
                  </Flex>
                )}
                {week.the546
                  .filter((row) => row[dayId] !== "-1")
                  .flatMap((item) => item[dayId].split(",").map(Number))
                  .map((row) => topics.find((topic) => topic?.id === row))
                  .filter((topic) => topic)
                  .map((topic, index) => (
                    <Flex gap={2} key={index}>
                      <Center
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius="xl"
                      >
                        {type === "day"
                          ? "الفترة " + ToArabic[index + 1]
                          : "الفترة " + ToArabic[index + 1 + 3]}
                      </Center>
                      <Box
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="md"
                        borderRadius="xl"
                      >
                        <Center fontWeight="bold">
                          {Subjects.find(
                            (subject) => subject.id === topic?.subject
                          )?.label || "تد فني تخصصي"}
                        </Center>

                        <Divider h={2} />
                        {topic?.name}
                      </Box>
                      <Center
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius="xl"
                      >
                        {topic?.place}
                      </Center>
                      <Center
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius="xl"
                      >
                        {topic?.training_tools}
                      </Center>
                      <Center
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius="xl"
                      >
                        {topic?.instructor}
                      </Center>
                    </Flex>
                  ))}
              </Stack>
            </Flex>
          )
        )}
      </Stack>
    </Stack>
  );
}

export default Week546;
