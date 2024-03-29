import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
const Carousel = (props) => {
    const imgs = Array.from(props.images)
    let [startX, setStartX] = useState(null)
    let startY, distX, distY;

    useEffect(() => {
        const slider = document.getElementById('slider')
        slider.addEventListener('touchstart', handleTonchStart)
        slider.addEventListener('touchmove', handleTouchMove)
        slider.addEventListener('touchend', handleTouchEnd)
        return () => {
            slider.removeEventListener('touchstart', handleTonchStart)
            slider.removeEventListener('touchmove', handleTouchMove)
            slider.removeEventListener('touchend', handleTouchEnd)
        }
    }, [startX])
    const nextImge = () => {
        if (props.selectImg < imgs.length - 1) {
            props.setSelectImg(props.selectImg + 1)
        }
        else {
            props.setSelectImg(0)
        }
    }
    const prevImge = () => {
        if (props.selectImg > 0) {
            props.setSelectImg(props.selectImg - 1)
        } else {
            props.setSelectImg(imgs.length - 1)
        }
    }
    const close = () => {
        props.setSelectImg(null)
    }
    // slide mobile
    // ฟังชั่น ใช้สำหรับ เลื่อนรูปภาพ
    function handleTonchStart(e) {
        const touch = e.touches[0]
        startX = setStartX(touch.clientX)
        startY = touch.clientY
    }
    function handleTouchEnd(e) {
        const touch = e.changedTouches[0]
        distX = touch.clientX - startX
        if (Math.abs(distX) > 50) {
            if (distX < 0) {
                nextImge()
            } else {
                prevImge()
            }
        }
    }
    function handleTouchMove(e) {
        if (!startX || !startY) return
        const touch = e.touches[0]
        distX = touch.clientX - startX
        distY = touch.clientY - startY
    }

    // debug
    // console.log(imgs[props.selectImg])
    // console.log(props)
    return (
        <>
            <Box w={"100%"} h={"100%"} position={'absolute'} top={0} zIndex={100000}>
                <Box display={'flex'} position={'sticky'} bg={'rgb(0,0,0,0.8)'} top={0} flexDirection={"column"} justifyContent={{ base: "start", md: "center" }} alignItems={"center"} w={"100%"} h={"calc(100vh)"} gap={0}>
                    <Box w={10} h={10} bg={'red'} position={"absolute"} display={"flex"} justifyContent={"center"} alignItems={"center"} color={'white'} rounded={'lg'} top={{ base: 2, md: 10 }} right={{ base: 2, md: 10 }} cursor={"pointer"} zIndex={10} onClick={close}><IoClose size={30} /></Box>
                    <Box id='slider' display={'flex'} justifyContent={{ base: "start", md: "center" }} mt={{ base: "4rem", md: "0rem" }} alignItems={{ base: "start", md: "center" }} w={{ base: "100%", md: "50rem" }} position={"relative"} h={{ base: "20rem", md: "40rem" }}>
                        <Image
                            src={imgs[props.selectImg]}
                            alt={imgs[props.selectImg]}
                            layout="fill"
                            objectFit="contain"
                        />
                        {/* Dot Show item */}
                        <Flex gap={2} position={"absolute"} bottom={{ base: "-2rem", md: 5 }} display={"flex"} justifyContent={"center"} w={"100%"}>
                            {imgs.map((img, index) => (
                                <Box key={index} className={`dot ${index === props.selectImg ? 'active' : ''}`} onClick={() => props.setSelectImg(index)} />
                            ))}
                        </Flex>
                    </Box>
                    {/* arrow */}
                    <Box w={"3rem"} h={"3rem"} bg={'#02685C'} color={'white'} cursor={"pointer"} position={"absolute"} rounded={"full"} display={{base:"none",md:"flex"}} justifyContent={"center"} alignItems={"center"} top={{ base: "26rem", md: "50%" }} right={10} onClick={nextImge}>
                        <FaAngleRight size={30} />
                    </Box>
                    <Box w={"3rem"} h={"3rem"} bg={'#02685C'} color={'white'} cursor={"pointer"} position={"absolute"} rounded={"full"} display={{base:"none",md:"flex"}} justifyContent={"center"} alignItems={"center"} top={{ base: "26rem", md: "50%" }} left={10} onClick={prevImge}>
                        <FaAngleLeft size={30} />
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Carousel