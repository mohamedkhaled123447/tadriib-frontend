import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";

interface AddIntervalModalProps {
  isOpen: boolean;
  onClose: () => void;
  addInterval: Function;
  setIntervalName: Function;
  intervalName: string;
}

const AddIntervalModal: React.FC<AddIntervalModalProps> = ({
  isOpen,
  onClose,
  addInterval,
  setIntervalName,
  intervalName,
}) => {
  const [error, setError] = useState("");
  const handleSubmit = () => {
    addInterval();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius='3xl'>
        <ModalHeader>إضافة فترة </ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <FormLabel>اسم الفترة</FormLabel>
            <Input
              value={intervalName}
              onChange={(e) => setIntervalName(e.target.value)}
              placeholder="ادخل اسم الفترة"
              borderRadius="full"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} mr={3}  borderRadius="full">
            الغاء
          </Button>
          <Button onClick={handleSubmit} colorScheme="blue"  borderRadius="full">
            اضافة
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddIntervalModal;
