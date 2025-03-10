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
  useDisclosure,
  Text,
} from "@chakra-ui/react";

interface RestoreIntervalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (data: any) => void; // Callback when JSON is restored
}

const RestoreIntervalModal: React.FC<RestoreIntervalModalProps> = ({
  isOpen,
  onClose,
  onRestore,
}) => {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setJsonData(jsonData);
        } catch (err) {
          setError("ملف JSON غير صالح.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="3xl">
        <ModalHeader>استعادة فترة</ModalHeader>
        <ModalBody>
          <Input
           borderRadius="full"
            type="file"
            accept="application/json"
            onChange={handleFileChange}
          />
          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} mr={3}  borderRadius="full">
            الغاء
          </Button>
          <Button
           borderRadius="full"
            colorScheme="blue"
            onClick={() => {
              if (jsonData) {
                onRestore(jsonData);
                onClose();
              } else {
                setError("الرجاء اختيار ملف JSON صالح.");
              }
            }}
          >
            استعادة
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestoreIntervalModal;
