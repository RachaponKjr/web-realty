'use client'
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'


import { FaAngleUp } from "react-icons/fa";

const BtnTop = () => {
    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("btnTop").style.display = "flex";
            } else {
                document.getElementById("btnTop").style.display = "none";
            }
        }
    })
    const topFunction = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <Box id='btnTop' w={'3.5rem'} h={'3.5rem'} bg={"#02685C"} _hover={{ bg: '#02685C' }} rounded={'full'} display={'none'} justifyContent={'center'} alignItems={'center'} cursor={'pointer'} color={'white'} onClick={topFunction}>
            <FaAngleUp size={20} />
        </Box>
    )
}

export default BtnTop