import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, useToast, VStack, Heading, Text, Link } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async () => {
    const url = `https://mnwefvnykbgyhbdzpleh.supabase.co/auth/v1/${isLogin ? "token?grant_type=password" : "signup"}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg",
        Authorization: "Bearer anonymous",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast({
        title: isLogin ? "Login Successful" : "Registration Successful",
        description: `Welcome ${email}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
      setPassword("");
    } else {
      toast({
        title: "Error",
        description: data.error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box p={6} boxShadow="md" borderRadius="md">
        <VStack spacing={4}>
          <Heading>{isLogin ? "Login" : "Register"}</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={isLogin ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
          </Button>
          <Stack pt={6}>
            <Text>
              {isLogin ? "Need an account?" : "Already have an account?"}{" "}
              <Link color="teal.500" onClick={handleToggle}>
                {isLogin ? "Register" : "Login"}
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
