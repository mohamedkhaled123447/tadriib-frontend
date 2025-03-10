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
import SubjectModal from "@/core/modals/SubjectModal";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useCalendar } from "@/context/UseCalendar";
import { SubjectData } from "@/core/interfaces";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const { subjects, setSubjects } = useCalendar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingSubject, setEditingSubject] = useState<SubjectData | null>(null);
 
  const handleAdd = async (subject: SubjectData) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/subject/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: subject.name,
        type: subject.type,
        persentage: subject.persentage,
        day: subject.day,
        night: subject.night,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSubjects((pre:SubjectData[]) => [...pre, data]);
      toast({
        title: "success",
        description: "تم إضافة المادة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleEdit = async (editedsubject: SubjectData) => {
    const res = await fetch(
      `${BASE_SERVER_URL}/api/subject/${editedsubject.id}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editedsubject.name,
          type: editedsubject.type,
          persentage: editedsubject.persentage,
          day: editedsubject.day,
          night: editedsubject.night,
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      setSubjects((pre:SubjectData[]) =>
        pre.map((subject) => (subject.id === editedsubject.id ? data : subject))
      );
      toast({
        title: "success",
        description: "تم تعديل المادة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleDelete = async (id: number) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/subject/${id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSubjects((pre:SubjectData[]) => pre.filter((subject) => subject.id !== id));
      toast({
        title: "success",
        description: "تم حذف المادة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <Center py={10}>
      <Stack spacing={5} w="90%">
        <Heading as="address" size="xl" textAlign="center">
          الموضوعات
        </Heading>
        <Stack spacing={4} padding={4}>
          <Heading size="lg">
            الموضوعات الرئيسية: (%
            {subjects
              .filter((subject) => subject.type === 1)
              .reduce((acc, subject) => acc + subject.persentage, 0)}
            )
          </Heading>
          {subjects
            .filter((subject) => subject.type === 1)
            .map((subject, index) => (
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
                  {subject.name}
                </Box>
                <Box>{subject.persentage}%</Box>
                <Box>
                  <Checkbox size="lg" isChecked={subject.day}>
                    نهاري
                  </Checkbox>
                </Box>
                <Box>
                  <Checkbox size="lg" isChecked={subject.night}>
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
                      setEditingSubject(subject);
                      onOpen();
                    }}
                  >
                    تعديل
                  </Button>
                  <Button
                    borderRadius="full"
                    onClick={() => handleDelete(subject.id)}
                    colorScheme="red"
                    size="sm"
                  >
                    حذف
                  </Button>
                </Box>
              </Flex>
            ))}
        </Stack>
        <Stack mt={10} spacing={4} padding={4}>
          <Heading size="lg">
            الموضوعات العامة: (%
            {subjects
              .filter((subject) => subject.type === 2)
              .reduce((acc, subject) => acc + subject.persentage, 0)}
            )
          </Heading>
          {subjects
            .filter((subject) => subject.type === 2)
            .map((subject, index) => (
              <Flex
                key={index + 1000}
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
                  {subject.name}
                </Box>
                <Box>{subject.persentage}%</Box>
                <Box>
                  <Checkbox size="lg" isChecked={subject.day}>
                    نهاري
                  </Checkbox>
                </Box>
                <Box>
                  <Checkbox size="lg" isChecked={subject.night}>
                    ليلي
                  </Checkbox>
                </Box>
                <Box>
                  <Button
                    borderRadius="full"
                    me={3}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => {
                      setEditingSubject(subject);
                      onOpen();
                    }}
                  >
                    تعديل
                  </Button>
                  <Button
                    borderRadius="full"
                    onClick={() => handleDelete(subject.id)}
                    colorScheme="red"
                    size="sm"
                  >
                    حذف
                  </Button>
                </Box>
              </Flex>
            ))}
        </Stack>
        <Stack spacing={2} align="center" justify="center">
          <Button
            w="fit-content"
            borderRadius="full"
            colorScheme="blue"
            onClick={() => {
              setEditingSubject(null);
              onOpen();
            }}
          >
            إضافة مادة جديدة
          </Button>

          <Button
            w="fit-content"
            borderRadius="full"
            mt={3}
            colorScheme="blue"
            onClick={() => router.push("/topics")}
          >
            التالي
          </Button>
        </Stack>
      </Stack>

      <SubjectModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        subject={editingSubject}
      />
    </Center>
  );
}
