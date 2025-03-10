import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Center,
  Stack,
  Flex,
  Box,
  Button,
  Text,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import DayClassModal from "@/core/modals/DayClassModal";
import { DayType } from "@/core/types/types";
import { useCalendar } from "@/context/UseCalendar";
export default function ItemsPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<DayType | undefined>(
    undefined
  );
  const { setTypes, types } = useCalendar();

  const handleAdd = () => {
    setModalMode("add");
    setSelectedItem(undefined);
    onOpen();
  };

  const handleEdit = (item: DayType) => {
    setModalMode("edit");
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (itemId: number) => {
    setTypes((pre: DayType[]) =>
      pre.filter((type: DayType) => type.id !== itemId)
    );
  };

  const handleDayClassSubmit = async (data: DayType) => {
    data.dayLearningHours = Number(data.dayLearningHours);
    data.nightLearningHours = Number(data.nightLearningHours);
    data.trainingHours = Number(data.trainingHours);
    data.boundEducationHours = Number(data.boundEducationHours);
    if (modalMode === "add") data.id = types.length + 1;
    if (modalMode === "edit") {
      setTypes((pre: DayType[]) =>
        pre.map((type: DayType) => (type.id === data.id ? data : type))
      );
    } else if (modalMode === "add") {
      setTypes((pre: DayType[]) => [...pre, data]);
    }
  };

  return (
    <Center py={5}>
      <Stack spacing={4} w="90%">
        <Heading as="address" size="xl" textAlign="center">
          المحددات
        </Heading>

        {types.map((item, index) => (
          <Flex
            key={item.id}
            p={5}
            px={10}
            borderWidth="1px"
            align="center"
            justify="space-between"
            bg="white"
            boxShadow="lg"
            _hover={{
              bg: "blue.50",
              transform: "scale(1.02)",
              transition: "0.3s ease-in-out",
              boxShadow: "xl",
            }}
            transition="all 0.3s ease-in-out"
            borderRadius="2xl"
            gap={4}
          >
            <Box fontSize="lg" fontWeight="semibold" flex="1" color="gray.700">
              {item.name}
            </Box>
            <Box fontSize="lg" flex="1" color="gray.600">
              {item.trainingHours} لياقة
            </Box>
            <Box fontSize="lg" flex="1" color="gray.600">
              {item.dayLearningHours} نهاري
            </Box>
            <Box fontSize="lg" flex="1" color="gray.600">
              {item.nightLearningHours} ليلي
            </Box>
            <Box fontSize="lg" flex="1" color="gray.600">
              {item.boundEducationHours} تعليم منضم
            </Box>
            <Box
              borderRadius="full"
              bg={item.color}
              h="10"
              w="24"
              boxShadow="sm"
            />

            <Flex gap={3}>
              <Button
                borderRadius="full"
                colorScheme="blue"
                size="sm"
                px={5}
                fontWeight="medium"
                onClick={() => handleEdit(item)}
              >
                تعديل
              </Button>
              <Button
                borderRadius="full"
                colorScheme="red"
                size="sm"
                px={5}
                fontWeight="medium"
                onClick={() => handleDelete(item.id)}
              >
                حذف
              </Button>
            </Flex>
          </Flex>
        ))}
        <Center>
          <Button
            w="fit-content"
            borderRadius="full"
            colorScheme="blue"
            size="lg"
            fontWeight="bold"
            onClick={handleAdd}
          >
            + إضافة محدد جديد
          </Button>
        </Center>
      </Stack>

      <DayClassModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDayClassSubmit}
        onDelete={handleDelete}
        initialData={selectedItem}
        mode={modalMode}
      />
    </Center>
  );
}
