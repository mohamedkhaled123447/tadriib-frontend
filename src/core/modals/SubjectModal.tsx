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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Subject {
    id: number;
    name: string;
    type: number;
    persentage: number;
    day: boolean;
    night: boolean;
}

interface SubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAdd: (subject: Subject) => void;
    handleEdit: (subject: Subject) => void;
    subject?: Subject | null;
}

const SubjectModal: React.FC<SubjectModalProps> = ({ isOpen, onClose, handleAdd, handleEdit, subject }) => {
    const toast = useToast();
    const [formData, setFormData] = useState<Subject>({
        id: 1,
        name: "",
        type: 1,
        persentage: 0,
        day: false,
        night: false,
    });

    useEffect(() => {
        if (subject) {
            setFormData(subject);
        } else {
            setFormData({
                id: Math.floor(Math.random() * 1000),
                name: "",
                type: 1,
                persentage: 0,
                day: false,
                night: false,
            });
        }
    }, [subject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "persentage" ? Number(value) : value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            toast({
                title: "خطأ",
                description: "يجب إدخال اسم المادة",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
            return;
        }
        if (!subject)
            handleAdd(formData)
        else
            handleEdit(formData)
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='3xl'>
            <ModalOverlay />
            <ModalContent dir="rtl" borderRadius='3xl'>
                <ModalCloseButton />
                <ModalHeader mt={3}>{subject ? "تعديل المادة" : "إضافة مادة جديدة"}</ModalHeader>
                <ModalBody>
                    <FormControl mb={3}>
                        <FormLabel>اسم المادة</FormLabel>
                        <Input borderRadius='full' name="name" value={formData.name} onChange={handleChange} placeholder="أدخل اسم المادة" />
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>نوع المادة</FormLabel>
                        <Select borderRadius='full' name="type" value={formData.type} onChange={handleChange}>
                            <option value={1}>موضوع رئيسي</option>
                            <option value={2}>موضوع عام</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel>النسبة المئوية</FormLabel>
                        <Input
                            borderRadius='full'
                            name="persentage"
                            type="number"
                            value={formData.persentage}
                            onChange={handleChange}
                            placeholder="أدخل النسبة المئوية"
                        />
                    </FormControl>

                    <FormControl mb={3}>
                        <Checkbox name="day" isChecked={formData.day} onChange={handleCheckboxChange}>
                            نهاري
                        </Checkbox>
                    </FormControl>

                    <FormControl mb={3}>
                        <Checkbox name="night" isChecked={formData.night} onChange={handleCheckboxChange}>
                            ليلي
                        </Checkbox>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button borderRadius='full' colorScheme="blue" onClick={handleSubmit}>
                        {subject ? "حفظ التعديلات" : "إضافة"}
                    </Button>
                    <Button borderRadius='full' variant="ghost" ml={3} onClick={onClose}>
                        إلغاء
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SubjectModal;
