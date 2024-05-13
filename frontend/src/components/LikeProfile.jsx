import { FaHeart } from "react-icons/fa6"

const LikeProfile = () => {

    const handleLikeProfile =async()=>{
        
    };

  return (
    <button
        className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
        onClick={handleLikeProfile}
    >
        <FaHeart size={16} /> Like Profile
	</button>
  )
}

export default LikeProfile