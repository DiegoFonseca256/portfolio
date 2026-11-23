import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  email: string;
  /** The button's name, and its tooltip before copying. */
  copyLabel: string;
  copiedLabel: string;
  /** Shown when the clipboard refuses; the address follows it. */
  failedLabel: string;
}

type Status = 'idle' | 'copied' | 'failed';

/**
 * Copies Diego's e-mail address, for a Recrutador whose mail client isn't the
 * one `mailto:` opens. The tooltip and a live region both say what happened. It
 * stays hidden until it hydrates: without JavaScript there is nothing to copy with.
 */
export default function CopyEmail({ email, copyLabel, copiedLabel, failedLabel }: Props) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setReady(true);
    return () => window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    let next: Status = 'copied';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = 'failed';
    }
    setStatus(next);
    setOpen(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), next === 'copied' ? 2000 : 6000);
  };

  const message = status === 'copied' ? copiedLabel : status === 'failed' ? `${failedLabel} ${email}` : copyLabel;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="text-foreground"
            aria-label={copyLabel}
            onClick={copy}
            hidden={!ready}
          >
            {status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={6}>{message}</TooltipContent>
      </Tooltip>
      <span role="status" className="sr-only">
        {status === 'idle' ? '' : message}
      </span>
    </TooltipProvider>
  );
}
