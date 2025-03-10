import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useCalendar } from "@/context/UseCalendar";
import RestoreIntervalModal from "@/core/modals/RestoreIntervalModal";
import AddIntervalModal from "@/core/modals/AddIntervalModal";
type Interval = {
  id: number;
  name: string;
};
import AlertDialogComponent from "@/components/AlertDialog";
export default function IntervalsList() {
  const toast = useToast();
  const { topics } = useCalendar();
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [intervalName, setIntervalName] = useState<string>("أدخل اسم الفترة");
  const [deltedInterval, setDeletedInterval] = useState<number>(-1);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addIntervalModal = useDisclosure();
  const handleOpen = () => setIsAlertOpen(true);
  const handleClose = () => setIsAlertOpen(false);
  const handleConfirm = () => {
    deleteInterval();
    handleClose();
  };
  const fetchIntervals = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/`);
    if (!res.ok) throw new Error("Failed to fetch intervals");
    const data: Interval[] = await res.json();
    setIntervals(data);
  };
  const addInterval = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: intervalName,
        topics: topics.map((topic) => topic.id),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setIntervals((pre) => [...pre, { id: data.id, name: data.name }]);
      toast({
        title: "success",
        description: "تم إضافة الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const deleteInterval = async () => {
    if (deltedInterval === -1) return;
    const res = await fetch(
      `${BASE_SERVER_URL}/api/interval/${deltedInterval}/`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      setIntervals((pre) =>
        pre.filter((interval) => interval.id !== deltedInterval)
      );
      toast({
        title: "success",
        description: "تم تعديل الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleRestore = async (jsonData: any) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: jsonData.name,
        topics: jsonData.topics,
        data: jsonData.data,
        monthsData: jsonData.monthsData,
        weekStart: jsonData.weekStart,
        types: jsonData.types,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setIntervals((pre) => [...pre, { id: data.id, name: data.name }]);
      toast({
        title: "success",
        description: "تم استعادة الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const exportToJson = (data: any, filename = "data.json") => {
    const jsonStr = JSON.stringify(data, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonStr], { type: "application/json" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Append the anchor to the body and trigger a click
    document.body.appendChild(a);
    a.click();

    // Remove the anchor and revoke the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fetchDataAndExport = async (intervalId: number) => {
    try {
      const res = await fetch(`${BASE_SERVER_URL}/api/interval/${intervalId}/`);
      const data = await res.json();
      exportToJson(data, `${data.name}.json`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIntervals();
  }, []);

  return (
    <Center py={10}>
      <Stack spacing={5} w={{ base: "90%", md: "60%" }}>
        <Heading size="xl" textAlign="center">
          الفترات التدريبية
        </Heading>
        {intervals.map((interval) => (
          <Flex
            key={interval.id}
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
            <Text
              onClick={() => router.push(`/Calender/${interval.id}/`)}
              fontSize="lg"
              fontWeight="bold"
              color="blue.700"
              cursor="pointer"
            >
              {interval.name}
            </Text>
            <Flex gap={2}>
              <Button
                borderRadius="full"
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  fetchDataAndExport(interval.id);
                }}
              >
                حفط نسخة
              </Button>
              <Button
                borderRadius="full"
                colorScheme="red"
                size="sm"
                onClick={() => {
                  setDeletedInterval(interval.id);
                  handleOpen();
                }}
              >
                حذف
              </Button>
            </Flex>
          </Flex>
        ))}
        <Center>
          <Button
            borderRadius="full"
            colorScheme="blue"
            ms={3}
            onClick={addIntervalModal.onOpen}
          >
            إضافة فترة تدريبية
          </Button>
          <Button
            borderRadius="full"
            colorScheme="blue"
            ms={3}
            onClick={onOpen}
          >
            استعادة فترة
          </Button>
        </Center>
      </Stack>
      <AlertDialogComponent
        isOpen={isAlertOpen}
        title="حذف الفترة"
        message="هل تريد حذف الفترة؟"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
      <RestoreIntervalModal
        isOpen={isOpen}
        onClose={onClose}
        onRestore={handleRestore}
      />
      <AddIntervalModal
        isOpen={addIntervalModal.isOpen}
        onClose={addIntervalModal.onClose}
        addInterval={addInterval}
        setIntervalName={setIntervalName}
        intervalName={intervalName}
      />
    </Center>
  );
}
