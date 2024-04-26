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

  const handleSubmit = () => {
    toast({
      title: isLogin ? "Login Successful" : "Registration Successful",
      description: `Welcome ${email}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // Reset form
    setEmail("");
    setPassword("");
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
