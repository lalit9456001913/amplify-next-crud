import React, { useState, useEffect } from 'react';
import TopicsList from '../components/TopicList';
import { getTopics, getSubTopics, getProblems, updateTopicProgress } from '../services/topic.service';
import { getAuth, removeAuth } from '../services/identity.service';
import { useRouter } from 'next/router';
import Logout from '../components/Logout';

const Dashboard = ({ topicsData }) => {
    const [topics, setTopics] = useState(topicsData);
    const [subTopics, setSubTopics] = useState({});
    const [problems, setProblems] = useState({});
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [selectedSubTopicId, setSelectedSubTopicId] = useState(null);
    const auth = getAuth();
    const router = useRouter();

    const handleLogout = () => {
        removeAuth();
        router.push('/login');
    };

    const loadTopics = async () => {
        const token = auth?.token;
        const response = await getTopics(token);
        if (response) {
            setTopics(response.data);
        }
    };

    const handleTopicSelect = async (topicId) => {
        const token = auth?.token;
        setSelectedTopicId(topicId);
        const response = await getSubTopics(token, topicId);

        setSubTopics((prev) => ({ ...prev, [topicId]: response?.data }));
    };

    const handleSubTopicSelect = async (topicId, subTopicId) => {
        const token = auth?.token;
        setSelectedSubTopicId(subTopicId);
        const response = await getProblems(token, topicId, subTopicId);
        if (response?.status) {
            setProblems((prev) => ({ ...prev, [`${topicId, subTopicId}`]: response?.data?.data }));

        }
    };

    const updateTopicStatus = async (topicId, isChecked) => {
        const token = auth?.token;
        const response = await updateTopicProgress(token, topicId, isChecked);
        if (response?.status) {
            loadTopics();
        }
    };

    useEffect(() => {
        if (auth?.token) {
            router.push('/dashboard');
        } else {
            router.push('/login')
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Logout handleLogout={handleLogout} />
            <TopicsList
                topics={topics}
                onSelectTopic={handleTopicSelect}
                onSelectSubtopic={handleSubTopicSelect}
                subTopics={subTopics}
                problems={problems}
                updateTopicStatus={updateTopicStatus}
            />
        </div>
    );
};

export async function getServerSideProps(context) {
    try {
        const auth = JSON.parse(context?.req?.cookies?.AUTH);
        if (!auth?.token) {
            return { redirect: { destination: '/login', permanent: false } };
        }
        const response = await getTopics(auth?.token);
        const topics = response?.data;
        return {
            props: { topicsData: topics },
        };
    } catch (error) {
        console.error("Error fetching topics:", error.message);
        return {
            props: { topicsData: [] },
        };
    }
}

export default Dashboard;
