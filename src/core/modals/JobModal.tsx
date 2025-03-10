import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Badge,
  useToast,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCalendar } from "@/context/UseCalendar";
import { Job } from "@/core/interfaces";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAdd: (job: Job) => void;
  handleEdit: (job: Job) => void;
  job?: Job | null;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  onClose,
  handleAdd,
  handleEdit,
  job,
}) => {
  const toast = useToast();
  const { subjectsData } = useCalendar();
  const [formData, setFormData] = useState<Job>({
    id: 1,
    name: "",
    subjects: subjectsData
      .filter((subject) => subject.type === 1)
      .map((subject) => subject.id),
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        id: Math.floor(Math.random() * 1000),
        name: "",
        subjects: subjectsData
          .filter((subject) => subject.type === 1)
          .map((subject) => subject.id),
      });
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "خطأ",
        description: "يجب إدخال اسم الوظيفة",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!job) handleAdd(formData);
    else handleEdit(formData);
    onClose();
  };
  const handleAddSubject = (id: number) => {
    const subjectId = formData.subjects.find((value) => value === id);
    if (subjectId) {
      setFormData((pre) => ({
        ...pre,
        subjects: pre.subjects.filter((value) => value !== id),
      }));
    } else {
      setFormData((pre) => ({
        ...pre,
        subjects: [...pre.subjects, id],
      }));
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent dir="rtl" borderRadius="3xl">
        <ModalCloseButton />
        <ModalHeader mt={3}>
          {job ? "تعديل وظيفة" : "إضافة وظيفة جديدة"}
        </ModalHeader>
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>اسم الوظيفة</FormLabel>
            <Input
              borderRadius="full"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسم الوظيفة"
            />
          </FormControl>
          <Heading as="h6" size="xs" pb={3}>
            المواد التخصصية
          </Heading>
          <Flex gap={5} wrap="wrap">
            {subjectsData
              .filter((subject) => subject.type === 1)
              .map((subject, index) => (
                <Badge
                  cursor="pointer"
                  key={index}
                  borderRadius="full"
                  colorScheme={
                    formData.subjects.find((value) => value === subject.id)
                      ? "green"
                      : "gray"
                  }
                  p={3}
                  onClick={() => handleAddSubject(subject.id)}
                >
                  {subject.name}
                </Badge>
              ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button borderRadius="full" colorScheme="blue" onClick={handleSubmit}>
            {job ? "حفظ التعديلات" : "إضافة"}
          </Button>
          <Button borderRadius="full" variant="ghost" ml={3} onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JobModal;
