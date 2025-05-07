import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

interface profileAvatarData {
    seed:string,
    size?:number
}
function ProfileAvatar({seed,size=64}:profileAvatarData) {
    const svg = createAvatar(funEmoji,{
        seed:seed,
        size:size,
        "radius": 50
    })
    return (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
  )
}
export default ProfileAvatar