import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function ViewTaskSideSheet({children}: {children?: React.ReactNode}) {
  return (
    <Drawer direction="right">
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent className="fixed bottom-0 right-0 mt-0 h-full w-[400px] rounded-l-lg after:!hidden">
          <DrawerHeader>
            <DrawerTitle>Right Side Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer slides in from the right side of the screen.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-sm text-muted-foreground">
              Add your drawer content here. This drawer comes from the right side
              instead of the default bottom position.
            </p>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}
