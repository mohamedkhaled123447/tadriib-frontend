import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

// Define props for the component
interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertDialogComponent: React.FC<AlertDialogProps> = ({ 
  isOpen, 
  title, 
  message, 
  onClose, 
  onConfirm 
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent  borderRadius="3xl">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter gap={2}>
            <Button ref={cancelRef} onClick={onClose} borderRadius='full'>
              الغاء
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3} borderRadius='full'>
              تأكيد
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
