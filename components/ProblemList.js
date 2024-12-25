const ProblemsList = ({ problems }) => {
    const levelColors = {
        Easy: "text-green-700 bg-green-100",
        Medium: "text-yellow-700 bg-yellow-100",
        Hard: "text-red-700 bg-red-100",
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Problems</h2>
            <div className="overflow-x-auto">

                <table className="min-w-full border-collapse border border-gray-200 bg-white text-left text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Title</th>
                            <th className="border border-gray-200 px-4 py-2">Leetcode</th>
                            <th className="border border-gray-200 px-4 py-2">Article</th>
                            <th className="border border-gray-200 px-4 py-2">Codeforces</th>
                            <th className="border border-gray-200 px-4 py-2">YouTube</th>
                            <th className="border border-gray-200 px-4 py-2">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr key={problem._id} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{problem.title}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {problem.leetcodeLink && (
                                        <a
                                            href={problem.leetcodeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            LeetCode
                                        </a>
                                    )}
                                </td>

                                <td className="border border-gray-200 px-4 py-2">
                                    {problem.articleLink && (
                                        <a
                                            href={problem.articleLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Article
                                        </a>
                                    )}
                                </td>


                                <td className="border border-gray-200 px-4 py-2">
                                    {problem.codeforcesLink && (
                                        <a
                                            href={problem.codeforcesLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Codeforces
                                        </a>
                                    )}

                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {problem.youtubeLink && (
                                        <a
                                            href={problem.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            YouTube
                                        </a>
                                    )}
                                </td>

                                <td className="border border-gray-200 px-4 py-2">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${levelColors[problem.level]}`}
                                    >
                                        {problem.level}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default ProblemsList;
