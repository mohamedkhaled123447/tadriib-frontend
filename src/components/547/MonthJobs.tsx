import React from "react";
import { Box, Flex, Input, Stack, Button, Heading } from "@chakra-ui/react";
import {
  MonthData,
  disMonth,
  disInterval,
  the547jobs,
} from "@/core/types/types";

function MonthJobs({
  monthData,
  month,
  type,
  limit,
  title,
}: {
  monthData: the547jobs;
  month: MonthData;
  type: string;
  limit: number;
  title: string;
}) {
  return (
    <Stack spacing={"2"} align={"center"} >
      <Stack textAlign="center" w="100%">
        <Box p="2" textAlign="center" bg="blackAlpha.200" borderRadius={"xl"}>
          {title}
        </Box>
      </Stack>
      <Flex gap={2}>
        <Stack>
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.200"
            w="14"
            borderRadius={"xl"}
          >
            شهر
          </Box>
          <Box
            p="5"
            textAlign="center"
            bg="blackAlpha.400"
            w="14"
            borderRadius={"xl"}
          ></Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="14"
              borderRadius={"xl"}
            >
              {month.totalTrainingHours}
            </Box>
          )}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="14"
            borderRadius={"xl"}
          >
            {monthData.totals.reduce((acc, value) => acc + value, 0) || "-"}
          </Box>
          {monthData.mat
            .filter((row, rowId) => rowId < limit)
            .map((row, rowId) => (
              <Box
                key={rowId}
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="14"
                borderRadius={"xl"}
              >
                {row.reduce((acc, value) => acc + value, 0) || "-"}
              </Box>
            ))}
          <Box
            p="5"
            textAlign="center"
            bg="blackAlpha.400"
            w="14"
            borderRadius={"xl"}
          >
            {""}
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="14"
              borderRadius={"xl"}
            >
              {month.totalBoundEducationHours}
            </Box>
          )}
          {monthData.mat
            .filter((row, rowId) => rowId >= limit)
            .map((row, rowId) => (
              <Box
                key={rowId + limit}
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="14"
                borderRadius={"xl"}
              >
                {row.reduce((acc, value) => acc + value, 0)}
              </Box>
            ))}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="14"
            borderRadius={"xl"}
          >
            {type === "day"
              ? month.totalDayLearningHours +
                month.totalTrainingHours +
                month.totalBoundEducationHours
              : month.totalNightLearningHours}
          </Box>
        </Stack>

        {month.weeks.map((week, weekId) => (
          <Stack key={weekId}>
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
              w="14"
              borderRadius={"xl"}
            >
              {weekId + 1}
            </Box>
            <Box
              p="5"
              textAlign="center"
              bg="blackAlpha.400"
              w="14"
              borderRadius={"xl"}
            ></Box>
            {type === "day" && (
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.200"
                w="14"
                borderRadius={"xl"}
              >
                {month.weeks[weekId].totalTrainingHours}
              </Box>
            )}
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.200"
              w="14"
              borderRadius={"xl"}
            >
              {monthData.totals[weekId] || "-"}
            </Box>
            {monthData.mat
              .filter((row: any, rowId: number) => rowId < limit)
              .map((row: any, rowId: number) => (
                <Box
                  key={rowId}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="14"
                  borderRadius={"xl"}
                >
                  {row[weekId] || "-"}
                </Box>
              ))}
            <Box
              p="5"
              textAlign="center"
              bg="blackAlpha.400"
              w="14"
              borderRadius={"xl"}
            ></Box>
            {type === "day" && (
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.200"
                w="14"
                borderRadius={"xl"}
              >
                {month.weeks[weekId].totalBoundEducationHours}
              </Box>
            )}
            {monthData.mat
              .filter((row: any, rowId: number) => rowId >= limit)
              .map((row: any, rowId: number) => (
                <Box
                  key={rowId + limit}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="14"
                  borderRadius={"xl"}
                >
                  {row[weekId] || "-"}
                </Box>
              ))}
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="14"
              borderRadius={"xl"}
            >
              {type === "day"
                ? monthData.mat.reduce(
                    (acc: number, row: any) => (acc += row[weekId]),
                    0
                  ) +
                  month.weeks[weekId].totalBoundEducationHours +
                  month.weeks[weekId].totalTrainingHours +
                  monthData.totals[weekId]
                : monthData.mat.reduce(
                    (acc: number, row: any) => (acc += row[weekId]),
                    0
                  ) + monthData.totals[weekId]}
            </Box>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
}

export default MonthJobs;
