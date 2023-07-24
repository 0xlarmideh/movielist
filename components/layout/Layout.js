import { Box, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
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

  const routeSlugs = [{ name: "Movies", slug: "/" }, { name: "Watchlist", slug: "/movie-watch-list"}]
  
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
        <Box px='30px' py="10px" mb="50px" mx="auto" maxW="900px">
          <Flex align="center" justify="space-between">
            <Flex fontSize="21px" fontWeight={400} gap={8}>
              {routeSlugs.map((route, index) => (
                <Link _hover={{textDecor: 'none', transform: 'scale(1.2)'}} borderBottom={router.pathname === route.slug ? '4px solid cyan' : '2px solid transparent'} key={index} as={NextLink} href={route?.slug}>
                  {route?.name}
                </Link>
              ))}
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
