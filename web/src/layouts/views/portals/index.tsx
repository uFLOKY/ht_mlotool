import { Alert, Box, Group, ScrollArea, Space, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import DebugMenu from "./components/DebugMenu";
import PortalInfo from "./components/PortalInfo";
import { MemoRoomSelect } from "../../shared/RoomSelect";
import { useLocale } from "../../../providers/LocaleProvider";
import { useGeneralStore } from "../../../store/general";
import { useRoomsStore } from "../../../store/rooms";
import { PortalDef } from "../../../types/PortalDef";

const Portals: React.FC = () => {
  const locale = useLocale((state) => state.locale);
  const mlo = useGeneralStore((state) => state.mlo);
  const activeRoom = useRoomsStore((state) => state.activeRoom);
  const [filteredRooms, setFilteredRooms] = useState<Array<PortalDef>>();

  useEffect(() => {
    let rooms: Array<PortalDef> | undefined = undefined;

    if (mlo) {
      rooms = mlo.portals.filter((portal) => (!portal.isMirror && (portal.fromRoomIndex === activeRoom?.index || portal.toRoomIndex == activeRoom?.index)));
    }

    setFilteredRooms(rooms);
  }, [activeRoom])

  return (
    <Box>
      <MemoRoomSelect />
      <Group position="apart" pt={20}>
        <Title order={4}>{locale("ui_portal_info")}</Title>
        <DebugMenu />
      </Group>

      <ScrollArea style={{ height: 650 }} pt={5}>
        {activeRoom?.portalCount
          && filteredRooms?.map((portal) => <PortalInfo key={portal.mloPortalIndex} portal={portal} portalIndex={portal.mloPortalIndex} />)
          || <Alert>{locale("ui_portal_alert")}</Alert>}
      </ScrollArea>
    </Box>
  );
};

export default Portals;
