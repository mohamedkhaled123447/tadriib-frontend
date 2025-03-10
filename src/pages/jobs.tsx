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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import JobModal from "@/core/modals/JobModal";
import { useRouter } from "next/router";
import { Job } from "@/core/interfaces";
import { useCalendar } from "@/context/UseCalendar";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
export default function Jobs() {
  const router = useRouter();
  const { jobs, setJobs } = useCalendar();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const fetchJobs = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/job/`);
    const data: Job[] = await res.json();
    setJobs(data);
  };

  const handleAdd = async (job: Job) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/job/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: job.name,
        subjects: job.subjects,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setJobs((pre: Job[]) => [...pre, data]);
      toast({
        title: "success",
        description: "تم إضافة الوظيفة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleEdit = async (editedjob: Job) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/job/${editedjob.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editedjob.name,
        subjects: editedjob.subjects,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setJobs((pre: Job[]) =>
        pre.map((job) => (job.id === editedjob.id ? data : job))
      );
      toast({
        title: "success",
        description: "تم تعديل الوظيفة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleDelete = async (id: number) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/job/${id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      setJobs((pre: Job[]) => pre.filter((job) => job.id !== id));
      toast({
        title: "success",
        description: "تم حذف الوظيفة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <Center py={10}>
      <Stack spacing={5} w='90%'>
        <Heading as="address" size='xl' textAlign="center">
          الوظائف
        </Heading>
        <Stack spacing={4} padding={4}>
          {jobs.map((job, index) => (
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
                {job.name}
              </Box>

              <Box>
                <Button
                  me={3}
                  size="sm"
                  colorScheme="green"
                  borderRadius="full"
                  onClick={() => {
                    setEditingJob(job);
                    onOpen();
                  }}
                >
                  تعديل
                </Button>
                <Button
                  borderRadius="full"
                  onClick={() => handleDelete(job.id)}
                  colorScheme="red"
                  size="sm"
                >
                  حذف
                </Button>
              </Box>
            </Flex>
          ))}
        </Stack>

        <Stack spacing={4} padding={4} align='center'>
          <Button
            borderRadius="full"
            mt={3}
            colorScheme="blue"
            w='fit-content'
            onClick={() => {
              setEditingJob(null);
              onOpen();
            }}
          >
            إضافة وظيفة جديدة
          </Button>
          <Flex gap={2}>
            <Button
              borderRadius="full"
               colorScheme="blue"
              w="100%"
              onClick={() => router.push("/HoursLink/months/day")}
            >
              توزيع الساعات علي الموضوعات نهاري
            </Button>
            <Button
              borderRadius="full"
               colorScheme="blue"
              w="100%"
              onClick={() => router.push("/HoursLink/months/night")}
            >
              توزيع الساعات علي الموضوعات ليلي
            </Button>
          </Flex>
        </Stack>
      </Stack>

      <JobModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        job={editingJob}
      />
    </Center>
  );
}
