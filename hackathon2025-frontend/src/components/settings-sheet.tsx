import type { Voice } from "~/types"

import { useEffect, useState } from "react"

import { Settings } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import getAvailableVoices from "~/functions/get_available_voices"
import { allLangCodes, languageCodeMap } from "~/constants/language_codes"
import { initialVoiceSettings } from "~/constants/initial_profile"

export function SettingsSheet({ onData }: { onData: (data: Voice) => void }) {
  const savedStr = localStorage.getItem("settings")
  const saved: Voice = savedStr ? JSON.parse(savedStr) : initialVoiceSettings

  const [voices, setVoices] = useState<Voice[]>([])
  const [languageCode, setLanguageCode] = useState(saved.languageCode)
  const [voiceName, setVoiceName] = useState(saved.voiceName)
  const [voiceGender, setVoiceGender] = useState(saved.voiceGender)

  useEffect(() => {
    const getVoices = async () => {
      const availableVoices = await getAvailableVoices(languageCode, voiceGender)
      setVoices(availableVoices)
    }
    getVoices()

  }, [languageCode, voiceGender])

  const handleClick = () => {
    const settings = { languageCode, voiceName, voiceGender }
    localStorage.setItem("settings", JSON.stringify(settings))
    onData(settings)
    console.log(languageCode, voiceName, voiceGender)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors duration-200"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Change Settings</SheetTitle>
          <SheetDescription>
            Make changes to your settings here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Select onValueChange={(value) => setLanguageCode(value)} defaultValue={languageCode}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Language Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language Code</SelectLabel>
                {allLangCodes.map(code => (
                  <SelectItem key={code} value={code}>
                    {languageCodeMap[code] || code}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setVoiceGender(value)} defaultValue={voiceGender}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Voice Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Voice Gender</SelectLabel>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setVoiceName(value)} defaultValue={voiceName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Voice Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Voice Name</SelectLabel>
                {voices && voices.map(voice => {
                  const displayName = voice.voiceName.split('-').slice(2).join('-')
                  if (displayName !== "") {
                    return <SelectItem key={voice.voiceName} value={voice.voiceName}>
                      {displayName}
                    </SelectItem>
                  }
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleClick}>Save changes</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
