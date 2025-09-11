import React, { useEffect, useState } from 'react'
import Service from '../utils/http'
import { Center, Text, Card, Divider, Avatar, Group, Stack, Box } from '@mantine/core';

const obj = new Service();

export default function Profile() {
    const [user, setUser] = useState({})

    const getProfileData = async () => {
        try {
            let data = await obj.get("user/me")
            setUser(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfileData();
    }, [])

    return (
        <Box style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            <Center style={{ minHeight: "80vh" }}>
                <Card
                    shadow="xl"
                    padding="xl"
                    radius="lg"
                    withBorder
                    style={{
                        minWidth: 350,
                        maxWidth: 400,
                        background: "white",
                        border: "1px solid #e0e0e0"
                    }}
                >
                    <Stack align="center" spacing="md">
                        <Avatar
                            src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                            alt="avatar"
                            size={90}
                            radius={90}
                            style={{ border: "2px solid #1971c2", background: "#f0f4fa" }}
                        />
                        <Text size="xl" weight={700} color="blue.8">{user?.name}</Text>
                        <Text size="md" color="dimmed">{user?.email}</Text>
                    </Stack>
                    <Divider my="md" />
                    <Stack spacing={6}>
                        {Object.entries(user).map(([key, value]) =>
                            key !== "avatar" && key !== "name" && key !== "email" ? (
                                <Group key={key} spacing="xs">
                                    <Text size="sm" weight={500} color="gray.7">{key}:</Text>
                                    <Text size="sm" color="dark">{String(value)}</Text>
                                </Group>
                            ) : null
                        )}
                    </Stack>
                </Card>
            </Center>
        </Box>
    )
}