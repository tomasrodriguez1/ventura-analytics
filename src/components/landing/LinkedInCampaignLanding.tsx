/**
 * =============================================================================
 * NO EDITAR para campañas nuevas — layout, responsive y accesibilidad
 * =============================================================================
 * El copy vive en `src/data/landingCampaigns/*.ts` (objeto `landingContent`).
 */

import type { ReactNode } from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import type { LinkedInCampaignContent } from '@/types/linkedinCampaignLanding'
import Navbar from '@/components/layout/Navbar'

type Props = {
  content: LinkedInCampaignContent
}

const EXTERNAL_PREFIXES = ['http://', 'https://', 'mailto:', 'tel:']

function isExternalHref(href: string) {
  return EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix))
}

function CampaignLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default function LinkedInCampaignLanding({ content }: Props) {
  const {
    eyebrow,
    headline,
    subheadline,
    bullets,
    primaryCta,
    secondaryCta,
    chips,
    trustLine,
    visual,
    links,
    footerLine,
  } = content

  const bulletsToShow = bullets.slice(0, 3)
  const siteUrl = links.siteUrl ?? '/'
  const backLabel =
    links.backToSiteLabel === undefined ? 'Volver al sitio' : links.backToSiteLabel
  const extraLink =
    siteUrl && backLabel ? { href: siteUrl, label: backLabel } : undefined

  return (
    <div className="relative min-h-[100dvh] min-h-svh overflow-x-hidden bg-white text-[#0B2A3C]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_-10%,rgba(63,169,245,0.18),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_80%_at_80%_20%,rgba(47,191,113,0.12),transparent_55%)]"
      />

      <Suspense fallback={<div className="h-20" aria-hidden />}>
        <Navbar extraLink={extraLink} />
      </Suspense>

      <main className="relative z-10 flex flex-1 flex-col pt-[5rem]">
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-[1400px] flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-stretch lg:gap-10 lg:px-10 lg:py-8">
          <div className="flex flex-1 flex-col justify-center gap-5 lg:max-w-[52%]">
            <p className="inline-flex w-fit items-center rounded-full border border-[#EBEEF1] bg-[#F7F8FA] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6F7A83]">
              {eyebrow}
            </p>
            <h1 className="font-[family-name:var(--font-inter)] text-[clamp(1.9rem,2.4vw+1.1rem,3rem)] font-bold leading-[1.15] tracking-tight text-[#0B2A3C]">
              {headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#4D555D] sm:text-[1rem]">{subheadline}</p>

            {bulletsToShow.length > 0 && (
              <ul className="space-y-2 text-sm text-[#4D555D]">
                {bulletsToShow.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#2FBF71]" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <CampaignLink
                href={primaryCta.href}
                className="btn-primary rounded-[var(--radius-lg)] text-sm"
              >
                {primaryCta.label}
              </CampaignLink>
              {secondaryCta ? (
                <CampaignLink
                  href={secondaryCta.href}
                  className="btn-outline rounded-[var(--radius-lg)] text-sm"
                >
                  {secondaryCta.label}
                </CampaignLink>
              ) : null}
            </div>

            {trustLine && (
              <p className="text-sm text-[#6F7A83]">{trustLine}</p>
            )}

            {chips.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#EBEEF1] bg-[#F7F8FA] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#4D555D]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center lg:max-w-[48%]">
            <div className="card-flat border border-[rgba(11,42,60,0.08)] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.3)]">
              <div className="flex items-start justify-between gap-4 border-b border-[rgba(11,42,60,0.05)] pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#0B2A3C]">{visual.title}</h2>
                  {visual.subtitle && (
                    <p className="text-sm text-[#4D555D]">{visual.subtitle}</p>
                  )}
                </div>
                {visual.badge && (
                  <span className="rounded-md border border-[#3FA9F5]/30 bg-[#3FA9F5]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0B2A3C]">
                    {visual.badge}
                  </span>
                )}
              </div>

              <ol className="mt-5 space-y-5">
                {visual.steps.map((step, index) => (
                  <li key={step.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EBEEF1] bg-[#F7F8FA] text-sm font-semibold text-[#0B2A3C]">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0B2A3C]">{step.label}</p>
                      {step.detail && (
                        <p className="text-sm text-[#6F7A83]">{step.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        {footerLine && (
          <footer className="border-t border-[var(--z-border)] px-4 py-3 sm:px-6 lg:px-10">
            <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#6F7A83]">
              {footerLine}
            </p>
          </footer>
        )}
      </main>
    </div>
  )
}
