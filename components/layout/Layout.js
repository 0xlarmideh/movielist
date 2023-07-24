import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "@/features/themeMode/themeSlice";
import NextLink from "next/link";

const Layout = ({children}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);
  // console.log(isDark);
  useEffect(() => {
    console.log(isDark)
  }, [isDark])
  const borderBottomColor = isDark ? "white" : "black";
  
  const toggleColorMode = () => {
    dispatch(toggleThemeMode());
  }
  return (
    <Box
      minH="100vh"
      color={isDark ? "black" : "white"}
      bg={isDark ? "white" : "black"}
    >
      <nav>
        <Box mx="auto" maxW="600px">
          <Flex align="center" justify="space-between">
            <Flex fontSize="21px" fontWeight={400} gap={4}>
              <Link
                as={NextLink}
                href="/"
                
              >
                Movies
              </Link>
              <Link
                href="/movie-watch-list"
                as={NextLink}
              >
                Watchlist
              </Link>
            </Flex>
            <IconButton
              mt={4}
              aria-label="Toggle Mode"
              onClick={() => toggleColorMode()}
            >
              {!isDark ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Flex>
        </Box>
      </nav>
      {children}
    </Box>
  );
};

export default Layout;
