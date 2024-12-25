import React from 'react';
import Accordian from './Accordian';
import SubTopicsList from './SubTopicList';


const TopicsList = ({ topics, onSelectTopic, onSelectSubtopic, subTopics = {}, problems = [], updateTopicStatus }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      <div className="space-y-2">
        {topics.map(topic => (
          <Accordian key={topic._id} isChecked={topic.isCompleted} title={topic.title} onClick={() => onSelectTopic(topic._id)} isShow={true} updateTopicStatus={(isChecked) => updateTopicStatus(topic._id, isChecked)}>
            {subTopics[topic._id]?.length && <SubTopicsList
              topicId={topic?._id}
              subTopics={subTopics[topic._id]}
              onSelectSubtopic={onSelectSubtopic}
              problems={problems}
            />}
          </Accordian>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
