import Tiptap from './components/Tiptap'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 w-full bg-neutral'>
      <Card>
        <CardContent>
          <Tiptap />
        </CardContent>
      </Card> 
    </div>
  )
}
