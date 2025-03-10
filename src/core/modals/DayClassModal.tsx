import { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Center,
} from "@chakra-ui/react";
import { DayType } from "../types/types";


type DayClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DayType) => void;
    onDelete: Function
    initialData?: DayType;
    mode: "add" | "edit";
};

const DayClassModal: React.FC<DayClassModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    onDelete,
    initialData,
    mode,
}) => {
    const [dayClassData, setDayClassData] = useState<DayType>({
        id: 0,
        color: '',
        name: '',
        boundEducationHours: 0,
        dayLearningHours: 0,
        nightLearningHours: 0,
        trainingHours: 0
    });

    useEffect(() => {
        if (initialData) {
            setDayClassData(initialData);
        } else {
            setDayClassData({
                id: 0,
                color: '',
                name: '',
                boundEducationHours: 0,
                dayLearningHours: 0,
                nightLearningHours: 0,
                trainingHours: 0
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        onSubmit(dayClassData);
        onClose();
    };
    const handleDayClassDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDayClassData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" size='4xl'>
            <ModalOverlay />
            <ModalContent borderRadius='3xl'>
                <ModalCloseButton />
                <ModalHeader mt={3}>{mode === "add" ? "إضافة محدد جديد" : "تعديل محدد"}</ModalHeader>
                <ModalBody pb={6}>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>اسم المحدد</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل اسم المحدد"
                            value={dayClassData.name}
                            name="name"
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>اللون</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل اللون"
                            name="color"
                            type="color"
                            value={dayClassData.color}
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>عدد ساعات اللياقة</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل عدد ساعات اللياقة"
                            name="trainingHours"
                            type="number"
                            value={dayClassData.trainingHours}
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>عدد ساعات النهاري</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل عدد ساعات النهاري"
                            name="dayLearningHours"
                            type="number"
                            value={dayClassData.dayLearningHours}
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>عدد ساعات الليلي</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل عدد ساعات الليلي"
                            name="nightLearningHours"
                            type="number"
                            value={dayClassData.nightLearningHours}
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                    <FormControl id="item-name" isRequired mb={4}>
                        <FormLabel>عدد ساعات التعليم المنضم</FormLabel>
                        <Input
                            borderRadius='full'
                            placeholder="أدخل عدد ساعات التعليم المنضم"
                            type="number"
                            name="boundEducationHours"
                            value={dayClassData.boundEducationHours}
                            onChange={handleDayClassDataChange}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button borderRadius='full' onClick={onClose} mr={3} me={3}>
                        الغاء
                    </Button>
                    <Button borderRadius='full' colorScheme="blue" onClick={handleSubmit}>
                        {mode === "add" ? "اضافة" : "حفظ"}
                    </Button>
                    {mode === 'edit' && (
                        <Button ms={3} borderRadius='full' colorScheme="red" onClick={()=>onDelete()}>
                            حذف
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DayClassModal;
