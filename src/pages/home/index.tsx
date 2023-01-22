import React from 'react';
import { gray } from '@ant-design/colors';
import { Typography } from 'antd';
import { TaskForm } from '@/components/home/TaskForm';
import { TaskList } from '@/components/home/TaskList';
import { Footer } from '@/components/home/footer/Footer';

const { Title, Text } = Typography;

export const HomePage: React.FC = () => (
  <div className="mt-16 flex max-h-screen justify-center md:mt-40">
    <div className="flex w-full max-w-md flex-col px-3">
      <Title level={3} className="text-center">
        todos
      </Title>

      <TaskForm />
      <TaskList />
      <Footer />

      <Text className="mt-4 text-center text-xs" style={{ color: gray[3] }}>
        Coded by <a href="https://jakubh.com/">Jakub Habrcetl</a>
      </Text>
    </div>
  </div>
);
