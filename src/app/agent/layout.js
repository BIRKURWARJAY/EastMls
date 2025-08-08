import AgentHeader from '@/components/AgentHeader'
import React from 'react'

function layout({ children }) {
    return (
        <div>
            <AgentHeader />
            {children}
        </div>
    )
}

export default layout
