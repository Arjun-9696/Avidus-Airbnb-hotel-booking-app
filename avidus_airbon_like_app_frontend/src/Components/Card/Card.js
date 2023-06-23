import { CardBody, Card, Image, Stack, Heading, Text, ButtonGroup, Button, CardFooter, Divider } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Cards = ({title,description,location,price,id}) => {
  return (
      <Card maxW='sm'>
        <NavLink to={`/property/${id}`}>
          <CardBody>
              <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                  w="100%"
              />
              <Stack mt='6' spacing='3'>
                  <Heading size='md'>{title}</Heading>
                  {/* <Text>
                      {description}
                  </Text> */}
                  <Text>
                      {location}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                          ₹ {price}.00/day
                  </Text>
                      <Text color='blue.600' fontSize='lg'>
                          20% Discount
                      </Text>
              </Stack>
          </CardBody>
          </NavLink>
      </Card>
  )
}

export default Cards