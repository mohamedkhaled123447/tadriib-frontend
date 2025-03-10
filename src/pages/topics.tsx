import {
  Button,
  Box,
  Text,
  Stack,
  useDisclosure,
  Flex,
  Center,
  Checkbox,
  useToast,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import TopicModal from "@/core/modals/TopicModal";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useCalendar } from "@/context/UseCalendar";
import { Topic } from "@/core/interfaces";
import AlertDialogComponent from "@/components/AlertDialog";
export default function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const {
    topics,
    jobs,
    setTopics,
    subjects,
    selectedTopics,
    setSelectedTopics,
    calenderId,
  } = useCalendar();
  const [subject, setSubject] = useState<number>(0);
  const [job, setJob] = useState<number>(0);
  const [type, setType] = useState<string>("day");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [deletedTopic, setDeletedTopic] = useState<number>(-1);
  const handleOpen = () => setIsAlertOpen(true);
  const handleClose = () => setIsAlertOpen(false);
  const handleConfirm = () => {
    handleDelete();
    handleClose();
  };
  const handleAdd = async (topic: Topic) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: topic.name,
        place: topic.place,
        training_tools: topic.training_tools,
        instructor: topic.instructor,
        day: topic.day,
        night: topic.night,
        level: topic.level,
        topic_class: topic.topic_class,
        subject: topic.subject === -1 ? null : topic.subject,
        job: topic.job === -1 ? null : topic.job,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTopics((pre: Topic[]) =>
        [...pre, data].sort((a, b) => a?.level - b?.level)
      );
      toast({
        title: "success",
        description: "تم إضافة الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      const data = await res.json();
    }
  };
  const handleEdit = async (editedtopic: Topic) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/${editedtopic.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editedtopic.name,
        place: editedtopic.place,
        training_tools: editedtopic.training_tools,
        instructor: editedtopic.instructor,
        day: editedtopic.day,
        night: editedtopic.night,
        level: editedtopic.level,
        topic_class: editedtopic.topic_class,
        subject: editedtopic.subject === -1 ? null : editedtopic.subject,
        job: editedtopic.job === -1 ? null : editedtopic.job,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTopics((pre: Topic[]) =>
        pre
          .map((topic) => (topic.id === editedtopic.id ? data : topic))
          .sort((a, b) => a?.level - b?.level)
      );
      toast({
        title: "success",
        description: "تم تعديل الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleDelete = async () => {
    if (deletedTopic === -1) return;
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/${deletedTopic}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTopics((pre: Topic[]) =>
        pre
          .filter((topic) => topic.id !== deletedTopic)
          .sort((a, b) => a?.level - b?.level)
      );
      toast({
        title: "success",
        description: "تم حذف الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleSaveTopics = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/${calenderId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topics: selectedTopics,
      }),
    });
    if (res.ok) {
      toast({
        title: "success",
        description: "تم حفظ الدروس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      localStorage.setItem("selectedTopics", JSON.stringify(selectedTopics));
      setTopics(
        selectedTopics
          .map((tempTopic) => topics.find((topic) => topic.id === tempTopic))
          .filter((topic): topic is NonNullable<typeof topic> => topic !== undefined) // Ensures topic is not undefined
          .sort((a, b) => (a.level ?? 0) - (b.level ?? 0)) // Uses nullish coalescing to prevent errors
      );
      
      router.push("/jobs");
    }
  };
  const filteredTopics = topics.filter((topic) => {
    if (type === "day") {
      if (subject === -1) {
        return topic.job === job && topic.day === true;
      } else {
        if (job === -1) {
          return topic.subject === subject && topic.day === true;
        } else {
          return (
            topic.subject === subject && topic.job === job && topic.day === true
          );
        }
      }
    } else {
      if (subject === -1) {
        return topic.job === job && topic.night === true;
      } else {
        if (job === -1) {
          return topic.subject === subject && topic.night === true;
        } else {
          return (
            topic.subject === subject &&
            topic.job === job &&
            topic.night === true
          );
        }
      }
    }
  });
  return (
    <Center py={10}>
      <Stack spacing={5} w="90%">
        <Heading as="address" size="xl" textAlign="center">
          الدروس
        </Heading>
        <Stack spacing={4} padding={4}>
          <Flex gap={4}>
            <Select
              borderRadius="2xl"
              placeholder="المادة"
              onChange={(e) => setSubject(Number(e.target.value))}
            >
              <option value={-1}>تد فني تخصصي</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.id}>
                  {" "}
                  {subject.name}
                </option>
              ))}
            </Select>
            <Select
              borderRadius="2xl"
              placeholder="الوظيفة"
              onChange={(e) => setJob(Number(e.target.value))}
            >
              <option value={-1}>الكل</option>
              {jobs.map((job, index) => (
                <option key={index} value={job.id}>
                  {job.name}
                </option>
              ))}
            </Select>
            <Select
              borderRadius="2xl"
              placeholder="نهاري/ليلي"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="day">نهاري</option>
              <option value="night">ليلي</option>
            </Select>
          </Flex>

          {filteredTopics.map((topic, index) => (
            <Flex
              key={index}
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
              <Box w="48" fontWeight="bold">
                {topic.name}
              </Box>
              <Box w="48" fontSize="xl">
                مستوي {topic.topic_class}
              </Box>
              <Box w="48" fontSize="xl">
                درجة الصعوبة {topic.level}
              </Box>
              <Box>
                <Checkbox size="lg" isChecked={topic.day}>
                  نهاري
                </Checkbox>
              </Box>
              <Box>
                <Checkbox size="lg" isChecked={topic.night}>
                  ليلي
                </Checkbox>
              </Box>
              <Box>
                <Button
                  me={3}
                  size="sm"
                  colorScheme="green"
                  borderRadius="full"
                  onClick={() => {
                    setEditingTopic(topic);
                    onOpen();
                  }}
                >
                  تعديل
                </Button>
                <Button
                  borderRadius="full"
                  onClick={() => {
                    setDeletedTopic(topic.id);
                    handleOpen();
                  }}
                  colorScheme="red"
                  size="sm"
                >
                  حذف
                </Button>
                <Checkbox
                  fontWeight="bold"
                  ms={4}
                  size="lg"
                  isChecked={
                    selectedTopics.find((tempTopic) => tempTopic === topic.id)
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTopics((pre: number[]) => [...pre, topic.id]);
                    } else {
                      setSelectedTopics((pre: number[]) =>
                        pre.filter((tempTopic) => tempTopic !== topic.id)
                      );
                    }
                  }}
                >
                  اختيار
                </Checkbox>
              </Box>
            </Flex>
          ))}
        </Stack>

        <Stack spacing={2} align="center" justify="center">
          <Flex gap={4}>
            <Button
              w="fit-content"
              borderRadius="full"
              colorScheme="blue"
              onClick={() => {
                setEditingTopic(null);
                onOpen();
              }}
            >
              إضافة درس جديدة
            </Button>

            <Button
              w="fit-content"
              borderRadius="full"
              colorScheme="blue"
              onClick={() => {
                router.reload();
              }}
            >
              اظهار جميع الدروس
            </Button>
          </Flex>

          <Button
            w="fit-content"
            borderRadius="full"
            mt={3}
            colorScheme="blue"
            onClick={handleSaveTopics}
          >
            التالي
          </Button>
        </Stack>
      </Stack>

      <TopicModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        topic={editingTopic}
      />
      <AlertDialogComponent
        isOpen={isAlertOpen}
        title="حذف الدرس"
        message="هل تريد حذف الدرس؟"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Center>
  );
}
