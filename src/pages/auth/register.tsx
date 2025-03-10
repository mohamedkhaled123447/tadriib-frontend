// components/Register.tsx
import { useState, FormEvent } from "react";
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

const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const toast = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "خطأ",
                description: "كلمتا المرور غير متطابقتين.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // Dummy registration logic – replace with your actual API call.
        if (username && email && password) {
            toast({
                title: "نجاح التسجيل",
                description: "تم إنشاء حسابك بنجاح.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            // For example, you might navigate to a login page:
            // router.push("/login");
        } else {
            toast({
                title: "فشل التسجيل",
                description: "يرجى ملء جميع الحقول.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Center height="100vh">
            <Box
                w='2xl'
                p={6}
                borderWidth="1px"
                borderRadius="3xl"
                boxShadow="md"
                bg="white"
            >
                <Heading mb={6} textAlign="center">
                    تسجيل حساب جديد
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>اسم المستخدم</FormLabel>
                            <Input
                                borderRadius="full"
                                type="text"
                                placeholder="أدخل اسم المستخدم"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>كلمة المرور</FormLabel>
                            <Input
                                borderRadius="full"
                                type="password"
                                placeholder="أدخل كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>تأكيد كلمة المرور</FormLabel>
                            <Input
                                borderRadius="full"
                                type="password"
                                placeholder="أعد إدخال كلمة المرور"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button borderRadius="full" type="submit" colorScheme="blue" width="full">
                            تسجيل
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    );
};

export default Register;
