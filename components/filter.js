import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react'


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
        border="1px solid #DEE1E5"
        color={!isDark ? "grey" : "#353746"}
        textAlign="left"
        fontSize="14px"
        fontWeight="400"
        // p="14px"
        w="255px"
        as={Button}
        _active={{
          bg: "white",
          color: isDark ? "grey" : "#353746",
          border: "1px solid #DEE1E5",
        }}
        textTransform='capitalize'
        // _hover={{ bg: "white", color: "#353746" }}
      >
        {data[selectedFilterIndex]}
      </MenuButton>
      <MenuList
        fontSize="14px"
        fontWeight="400"
        p="15px"
        color="#353746"
        w="255px"
      >
        {data.map((name, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setFilter(name)
              setSelectedFilterIndex(index)}}
            borderRadius="8px"
            px="22px"
            py="15px"
            textTransform='capitalize'
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterWatchlist