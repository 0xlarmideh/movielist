import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react'

// Filter component
const FilterWatchlist = ({
  data,
  setSelectedFilterIndex,
  setFilter,
  selectedFilterIndex,
  isDark,
}) => {
  return (
    <Menu>
      <MenuButton
        variant="outline"
        color={isDark ? "gainsboro" : "#353746"}
        textAlign="left"
        fontSize="14px"
        fontWeight="400"
        // p="14px"
        w="255px"
        as={Button}
        _active={{
          bg: isDark ? "gainsboro" : "transparent",
          color: isDark ? "grey" : "#353746",
        }}
        textTransform="capitalize"
      >
        {data[selectedFilterIndex]}
      </MenuButton>
      <MenuList
        fontSize="14px"
        fontWeight="400"
        p="15px"
        color="#353746"
        bg={isDark ? "black" : "white"}
        w="255px"
      >
        {data.map((name, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setFilter(name);
              setSelectedFilterIndex(index);
            }}
            borderRadius="8px"
            px="22px"
            py="15px"
            color={isDark ? "gainsboro" : "#353746"}
            background={isDark ? "#1F2933" : "whitesmoke"}
            textTransform="capitalize"
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterWatchlist