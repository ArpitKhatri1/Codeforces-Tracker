import React from 'react'
type personalTagType = {
    params: {
        personaltag: string
    }

}
const PersonalTag = ({ params }: personalTagType) => {

    return (
        <div>{params.personaltag}</div>
    )
}

export default PersonalTag

