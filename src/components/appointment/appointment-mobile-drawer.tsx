"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { trackAppointmentFormOpened } from "@/features/appointments/appointment.analytics";

/** Mobile hero variant: a single prominent CTA opens an accessible drawer
 * containing the full form, rather than squeezing the full desktop form
 * above the fold. Visibility (mobile vs. desktop) is controlled by the
 * caller so it can sit directly in the hero's CTA row instead of stacking
 * a second, redundant call to action below it. */
export function AppointmentMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => {
          setOpen(true);
          trackAppointmentFormOpened("mobile-drawer");
        }}
      >
        Request an Appointment
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Request an Appointment">
        <AppointmentForm source="mobile-drawer" compact />
      </Drawer>
    </>
  );
}
