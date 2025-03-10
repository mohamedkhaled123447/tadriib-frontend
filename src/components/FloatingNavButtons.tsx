import { Button, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const FloatingNavButtons = () => {
  const router = useRouter();

  return (
    <VStack position="fixed" bottom="20px" right="20px" spacing={6}>
      <Button
        leftIcon={<Image src="/icons/home.png" alt="Back" boxSize="14" />}
        colorScheme="white"
        onClick={() => router.push("/")}
      ></Button>

      <Button
        leftIcon={<Image src="/icons/back.png" alt="Back" boxSize="14" />}
        colorScheme="white"
        onClick={() => router.back()}
      ></Button>
    </VStack>
  );
};

export default FloatingNavButtons;
