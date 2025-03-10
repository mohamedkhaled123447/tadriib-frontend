// components/Login.tsx
import { useState } from "react";
import {
  Center,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy authentication logic.
    if (email === "admin@example.com" && password === "admin") {
      toast({
        title: "نجاح تسجيل الدخول",
        description: "مرحباً بعودتك!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // For example: router.push('/dashboard');
    } else {
      toast({
        title: "فشل تسجيل الدخول",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center height="100vh">
      <Box
        w="2xl"
        p={6}
        borderWidth="1px"
        borderRadius="3xl"
        boxShadow="md"
        bg="white"
      >
        <Heading mb={6} textAlign="center">
          تسجيل الدخول
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel> اسم المستخدم</FormLabel>
              <Input
                borderRadius='full'
                type="email"
                placeholder="أدخل اسم المستخدم"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>كلمة المرور</FormLabel>
              <Input
                borderRadius='full'
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button borderRadius='full' type="submit" colorScheme="blue" width="full">
              تسجيل الدخول
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
