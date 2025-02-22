import React, { useState, useRef, useEffect } from "react";
import { Box, Button, VStack, Collapse } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const CustomDropdown = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box position="relative" ref={containerRef}>
      <Button
        onClick={handleToggle}
        variant="outline"
        minW="200px"
        rightIcon={
          <ChevronDownIcon
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.2s"
          />
        }
      >
        {selected || placeholder}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          position="absolute"
          mt={2}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          zIndex={10}
          boxShadow="md"
          maxH="200px"
          overflowY="auto"
          w="100%"
        >
          <VStack spacing={0} align="stretch">
            {options.map((option) => (
              <Button
                key={option}
                variant="ghost"
                justifyContent="flex-start"
                onClick={() => handleOptionClick(option)}
                _hover={{ bg: "gray.100" }}
              >
                {option}
              </Button>
            ))}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CustomDropdown;
