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

  // Route slugs
  const routeSlugs = [{ name: "Movies", slug: "/" }, { name: "Watchlist", slug: "/movie-watch-list"}]
  
  // Function to toggle theme mode
  const toggleColorMode = () => {
    dispatch(toggleThemeMode());
  }
  return (
    <Box
      minH="100vh"
      color={isDark ? "white" : "black"}
      bg={isDark ? "black" : "#EDF7F7"}
    >
      <nav>
        <Box
          bg={!isDark ? "white" : "#188B8C"}
          position="fixed"
          w="100%"
          mx="auto"
          zIndex={999}
        >
          <Flex
            mx="auto"
            px="30px"
            py="10px"
            maxW="900px"
            align="center"
            justify="space-between"
          >
            <Flex fontSize="21px" fontWeight={400} gap={8}>
              {routeSlugs.map((route, index) => (
                <Link
                  _hover={{
                    textDecor: "none",
                    transition: "0.35s all ease-in",
                    transform: "scale(1.2)",
                  }}
                  borderBottom={
                    // If current route matches the slug, add border
                    router.pathname === route.slug
                      ? "4px solid #F5A541"
                      : "2px solid transparent"
                  }
                  key={index}
                  as={NextLink}
                  href={route?.slug}
                >
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
      <Box pt="110px">{children}</Box>
    </Box>
  );
};

export default Layout;
