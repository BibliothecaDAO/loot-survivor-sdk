import { RoundedContainer } from "./RoundedContainer";

const items = [
    {
        title: "+2 Strength",
    },
    {
        title: "Equip Sword",
    },
];

export const Confirmation = () => {
    return (
        <RoundedContainer className="bg-primary/40">
            <div className="text-4xl p-4 text-center ">Upgrading...</div>

            <RoundedContainer className="p-4 grid grid-cols-3 gap-4" inner>
                {items.map((item) => (
                    <ConfirmationCard>
                        <div>{item.title}</div>
                    </ConfirmationCard>
                ))}
            </RoundedContainer>
        </RoundedContainer>
    );
};

export const ConfirmationCard = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="border border-primary bg-primary/40 text-center rounded-2xl p-4 animate-pulse">
            {children}
        </div>
    );
};
