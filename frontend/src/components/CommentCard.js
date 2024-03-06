export function CommentCard({ user, content }) {
    return (
        <div className="flex items-center py-3 ">
            <div className="">
                <div className="font-normal text-white">{user}</div>
                <div className="bg-gray-200 text-gray-800 rounded-lg p-2 text-sm max-w-xs">{content}</div>
            </div>
        </div>
    );
}
