import { Modal } from '@/shared/ui/modal/modal'

type TrailerModalProps = {
  open: boolean
  onClose: () => void
  youtubeKey: string | null
  title: string
}

export function TrailerModal({ open, onClose, youtubeKey, title }: TrailerModalProps) {
  if (!youtubeKey) return null

  return (
    <Modal open={open} onClose={onClose} title={`Трейлер: ${title}`} panelClassName="aspect-video">
      <iframe
        title={`Трейлер: ${title}`}
        src={`https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0&modestbranding=1`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </Modal>
  )
}
