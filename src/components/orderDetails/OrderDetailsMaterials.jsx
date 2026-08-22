import React, { memo } from 'react';
import { Lock, Package, Wallet } from 'lucide-react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_CTA_ICON_SIZE,
  ORDER_DETAILS_PAY_ICON_SIZE,
  getOrderStatusLabel,
} from './orderDetailsData';

const { actions, labels, materialPayHint, sections } = ORDER_DETAILS_CONTENT;

const OrderDetailsMaterials = memo(({ order, isOpen, sectionId, onToggle, onPayMaterials }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.materials}
    icon={Package}
    badge={getOrderStatusLabel(order.status)}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-[#90a1b9]">{labels.materialRequired}</p>
        <span className="rounded-full border border-[#ffd6a8] bg-[#fff7ed] px-2.5 py-1 text-xs font-semibold text-[#ca3500]">
          {order.materialRequired ? 'YES' : 'NO'}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#f1f5f9]">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs font-semibold text-[#90a1b9]">
            <tr className="border-b border-[#f1f5f9]">
              <th className="px-4 py-3 font-semibold">{labels.item}</th>
              <th className="px-4 py-3 font-semibold">{labels.qty}</th>
              <th className="px-4 py-3 text-right font-semibold">{labels.cost}</th>
            </tr>
          </thead>
          <tbody>
            {order.materialItems.map((item) => (
              <tr key={item.id} className="border-b border-[#f8fafc]">
                <td className="px-4 py-3 font-medium text-[#314158]">{item.name}</td>
                <td className="px-4 py-3 text-[#90a1b9]">{item.qty}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#0f172b]">{item.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#f8fafc]">
              <td className="px-4 py-3.5 font-bold text-[#0f172b]" colSpan={2}>
                {labels.total}
              </td>
              <td className="px-4 py-3.5 text-right text-base font-bold text-[#0f172b]">
                {order.materialTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#ff6900] to-[#f54900] p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#ffedd4]">{labels.materialCostDue}</p>
            <p className="mt-1 text-4xl font-bold leading-10">{order.materialTotal}</p>
          </div>
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/20">
            <Wallet size={ORDER_DETAILS_PAY_ICON_SIZE} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#ffedd4]">{materialPayHint}</p>
        <button
          type="button"
          onClick={onPayMaterials}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-[#f54900] transition-colors hover:bg-[#fff7ed] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Lock size={ORDER_DETAILS_CTA_ICON_SIZE} aria-hidden="true" />
          {actions.payMaterials(order.materialTotal)}
        </button>
      </div>
    </div>
  </OrderDetailsSection>
));

OrderDetailsMaterials.displayName = 'OrderDetailsMaterials';

export default OrderDetailsMaterials;
