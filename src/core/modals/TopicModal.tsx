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
  Select,
  Checkbox,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Topic } from "@/core/interfaces";
import { useCalendar } from "@/context/UseCalendar";
interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAdd: (topic: Topic) => void;
  handleEdit: (topic: Topic) => void;
  topic?: Topic | null;
}

const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  onClose,
  handleAdd,
  handleEdit,
  topic,
}) => {
  const { subjects, jobs } = useCalendar();
  const toast = useToast();
  const [formData, setFormData] = useState<Topic>({
    id: 1,
    name: "",
    place: "",
    training_tools: "",
    instructor: "",
    day: false,
    night: false,
    level: 0,
    topic_class: "",
    subject: -1,
    job: -1,
  });

  useEffect(() => {
    if (topic) {
      setFormData(topic);
    } else {
      setFormData({
        id: Math.floor(Math.random() * 1000),
        name: "",
        place: "",
        training_tools: "",
        instructor: "",
        day: false,
        night: false,
        level: 0,
        topic_class: "",
        subject: -1,
        job: -1,
      });
    }
  }, [topic]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "level" || name === "subject" || name === "job"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "خطأ",
        description: "يجب إدخال اسم الدرس",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!topic) handleAdd(formData);
    else handleEdit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent dir="rtl" borderRadius="3xl">
        <ModalCloseButton />
        <ModalHeader mt={3}>
          {topic ? "تعديل الدرس" : "إضافة درس جديدة"}
        </ModalHeader>
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>اسم الدرس</FormLabel>
            <Input
              borderRadius="full"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسم الدرس"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>المادة</FormLabel>
            <Select
              borderRadius="full"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value={-1}>تد فني تخصصي</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>التخصص</FormLabel>
            <Select
              borderRadius="full"
              name="job"
              value={formData.job}
              onChange={handleChange}
            >
              <option value={-1}>كل التخصصات</option>
              {jobs.map((job, index) => (
                <option key={index} value={job.id}>
                  {job.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel> المكان</FormLabel>
            <Input
              borderRadius="full"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="أدخل  المكان"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel> مساعدات التدريب</FormLabel>
            <Input
              borderRadius="full"
              name="training_tools"
              value={formData.training_tools}
              onChange={handleChange}
              placeholder="أدخل  مساعدات التدريب"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel> المعلم المشرف</FormLabel>
            <Input
              borderRadius="full"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="أدخل   المعلم المشرف"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel> درجة الصعوبة</FormLabel>
            <Input
              borderRadius="full"
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="أدخل درجة الصعوبة"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel> مستوي الدرس</FormLabel>
            <Input
              borderRadius="full"
              name="topic_class"
              value={formData.topic_class}
              onChange={handleChange}
              placeholder="أدخل مستوي الدرس"
            />
          </FormControl>

          <FormControl mb={3}>
            <Checkbox
              name="day"
              isChecked={formData.day}
              onChange={handleCheckboxChange}
            >
              نهاري
            </Checkbox>
          </FormControl>

          <FormControl mb={3}>
            <Checkbox
              name="night"
              isChecked={formData.night}
              onChange={handleCheckboxChange}
            >
              ليلي
            </Checkbox>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button borderRadius="full" colorScheme="blue" onClick={handleSubmit}>
            {topic ? "حفظ التعديلات" : "إضافة"}
          </Button>
          <Button borderRadius="full" variant="ghost" ml={3} onClick={onClose}>
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TopicModal;
